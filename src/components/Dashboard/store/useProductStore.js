import create from 'zustand';

const useProductStore = create((set) => ({
    productName: '',
    setProductName: (name) => set({ productName: name }),

    productDescription: '',
    setProductDescription: (description) => set({ productDescription: description }),

    productPrice: '',
    setProductPrice: (price) => set({ productPrice: price }),

    productImage: [],
    setProductImage: (images) => set({ productImage: images }),

    productCategory: '',
    setProductCategory: (category) => set({ productCategory: category }),

    showImageDialog: false,
    setShowImageDialog: (value) => set({ showImageDialog: value }),

    newCategory: true,
    setNewCategory: (value) => set({ newCategory: value }),

    categories: [],
    setCategories: (categories) => set({ categories }),

    selectedCategory: '',
    setSelectedCategory: (category) => set({ selectedCategory: category }),
}));

export default useProductStore;