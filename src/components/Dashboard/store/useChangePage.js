
import { create } from 'zustand'

// export const useBearStore = create((set) => ({

//     bears: 0,
//     increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//     removeAllBears: () => set({ bears: 0 }),
// }
// )
// );
// ! in the admin Dashboard used to change the pages 
export const useChangePage = create((set) =>


({
    currentPage: '/admin/salesReport',
    changeToNewPage: (page) => set({ currentPage: page })

})


);
