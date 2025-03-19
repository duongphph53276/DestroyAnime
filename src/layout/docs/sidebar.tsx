import { useState } from 'react';

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

const ChevronUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    </svg>
);

const SidebarDocs = () => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const toggleDropdown = (menu: string) => {
        setOpenDropdown(openDropdown === menu ? null : menu);
    };

    return (
        <div className='w-64 h-screen bg-white shadow-lg p-4'>
            <ul className='space-y-4'>
                <li>
                    <a href='/dashboard' className='block p-3 rounded-lg font-bold bg-blue-500 text-white text-center hover:bg-blue-600'>
                        Dashboard
                    </a>
                </li>
                
                {/* Sản phẩm Dropdown */}
                <li>
                    <button 
                        onClick={() => toggleDropdown('products')} 
                        className='flex items-center justify-between w-full p-3 rounded-lg font-bold border hover:bg-gray-100'
                    >
                        Sản Phẩm {openDropdown === 'products' ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    </button>
                    {openDropdown === 'products' && (
                        <ul className='mt-2 space-y-2 pl-4'>
                            <li><a href='/dashboard/products' className='block p-2 rounded-lg hover:bg-gray-200'>Danh sách</a></li>
                            <li><a href='/dashboard/addproducts' className='block p-2 rounded-lg hover:bg-gray-200'>Thêm mới</a></li>
                        </ul>
                    )}
                </li>
                
                {/* Đơn hàng Dropdown */}
                <li>
                    <button 
                        onClick={() => toggleDropdown('orders')} 
                        className='flex items-center justify-between w-full p-3 rounded-lg font-bold border hover:bg-gray-100'
                    >
                        Đơn hàng {openDropdown === 'orders' ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    </button>
                    {openDropdown === 'orders' && (
                        <ul className='mt-2 space-y-2 pl-4'>
                            <li><a href='/dashboard/orders' className='block p-2 rounded-lg hover:bg-gray-200'>Danh sách</a></li>
                            <li><a href='/dashboard/addorders' className='block p-2 rounded-lg hover:bg-gray-200'>Thêm mới</a></li>
                        </ul>
                    )}
                </li>
                
                {/* Danh mục Dropdown */}
                <li>
                    <button 
                        onClick={() => toggleDropdown('categories')} 
                        className='flex items-center justify-between w-full p-3 rounded-lg font-bold border hover:bg-gray-100'
                    >
                        Danh mục {openDropdown === 'categories' ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    </button>
                    {openDropdown === 'categories' && (
                        <ul className='mt-2 space-y-2 pl-4'>
                            <li><a href='/dashboard/category' className='block p-2 rounded-lg hover:bg-gray-200'>Danh sách</a></li>
                            <li><a href='/dashboard/addcategory' className='block p-2 rounded-lg hover:bg-gray-200'>Thêm mới</a></li>
                        </ul>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default SidebarDocs;