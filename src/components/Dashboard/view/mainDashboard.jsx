
import AddProductPage from './products_page';
import SalesReportPage from './sales_report_Page';
import AdminOrdersPage from './orders_page';
import GeneralInfo from './general_site_info';

// !custom hook (State managment for changing pages in Admin dashboard)
import { useChangePage } from '../store/useChangePage';

import Sidebar from '../widgets/sideBar';

const adminPages = {
    '/admin/salesReport': SalesReportPage,
    '/admin/orders': AdminOrdersPage,
    '/admin/products': AddProductPage,
    '/admin/generalInfo': GeneralInfo
};
const MainDashboard = () => {
    const page = useChangePage((state) => state.currentPage);
    // console.log('page name' + page);
    const PageComponent = adminPages[page];
    return (
        <div id='background' className='grid grid-cols-1 md:grid-cols-6   md:grid-rows-1 overflow-y-auto md:overflow-hidden bg-dark-blue w-screen h-screen'>
            <Sidebar />

            <div className='col-span-5 m-2 md:mr-8  place-items-center  shadow-sm shadow-gray-300 rounded-xl md:h-5/6 self-center bg-white'>
                <PageComponent currentPage={page} />
            </div>
        </div>
    );
};

export default MainDashboard;