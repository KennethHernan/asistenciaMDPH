import { child, get, ref, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase/firebaseConfig";

//======================= CREAR, ACTUALIZAR, ELIMINAR ===========================

export const createNewOrder = async (orderData) => {
  try {
    const orderId = uuidv4();
    await set(ref(db, `orderMK/${orderId}`), {
      idOrder: orderId,
      ...orderData,
      createdAt: new Date().toISOString(),
    });
    return orderId;
  } catch (error) {
    console.error("Error al crear la orden:", error);
    throw error;
  }
};

//======================= Listar solo una tabla ===========================

export const getProducts00 = async () => {
  try {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, "product"));

    if (!snapshot.exists()) return [];

    const data = snapshot.val();
    return Object.entries(data).map(([id, value]) => ({ id, ...value }));
  } catch (error) {
    console.error("Error al leer productos:", error);
    return [];
  }
};
export const getCategorys = async () => {
  try {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, "category"));

    if (!snapshot.exists()) return [];

    const data = snapshot.val();
    return Object.entries(data).map(([id, value]) => ({ id, ...value }));
  } catch (error) {
    console.error("Error al leer category:", error);
    return [];
  }
};

//======================= Listar varias tablas relacionadas ===========================
export const getCategories = async () => {
  const snapshot = await get(child(ref(db), "category"));
  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.entries(data).reduce((acc, [id, value]) => {
      acc[id] = value.category || "null";
      return acc;
    }, {});
  }
  return {};
};
export const getOffers = async () => {
  const snapshot = await get(child(ref(db), "offers"));
  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.entries(data).reduce((acc, [id, value]) => {
      acc[id] = value.discount || 0;
      return acc;
    }, {});
  }
  return {};
};

export const getProducts = async () => {
  const [categories, offers] = await Promise.all([
    getCategories(),
    getOffers(),
  ]);

  const snapshot = await get(child(ref(db), "product"));
  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.entries(data).map(([id, value]) => ({
      id,
      ...value,
      category: categories[value.idCategory],
      discount: offers[value.idOffers],
    }));
  }
  return [];
};

// Categorias con sus productos
export const getCategoriesWithProducts = async () => {
  try {
    const [categories, products] = await Promise.all([
      getCategorys(),
      getProducts00(),
    ]);

    const grouped = categories.map((cat) => ({
      id: cat.id,
      category: cat.category,
      products: products.filter((prod) => prod.idCategory === cat.id),
    }));

    return grouped;
  } catch (error) {
    console.error("Error al obtener categorías con productos:", error);
    return [];
  }
};

// Productos filtrados por categoría
export const getProductsByCategory = async (categoryId) => {
  try {
    const allProducts = await getProducts();

    // Filtrar productos que pertenezcan a esa categoría
    const filtered = allProducts.filter(
      (prod) => prod.idCategory === categoryId
    );

    return filtered;
  } catch (error) {
    console.error("Error al filtrar productos por categoría:", error);
    return [];
  }
};

// Obtener nombre de categoría por ID
export const getCategoryNameById = async (idCategoria) => {
  const categories = await getCategories();
  return categories[idCategoria] || null;
};


(async () => {
  try {
    const snap = await get(ref(db, "product"));
    console.log("¿Existe product?", snap.exists());
    if (snap.exists()) console.log("Primer producto:", Object.values(snap.val())[0]);
  } catch (err) {
    console.error("🔥 Error leyendo product:", err);
  }
})();