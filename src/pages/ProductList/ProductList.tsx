import Products from "./Products";
import SiderBarFilter from "./SideBarFilter";
import SortProductList from "./SortProductList";

export default function Produclist() {
  return <div className='bg-gray-200 py-6'>
    <div className="container">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-2">
          <SiderBarFilter/>
        </div>
        <div className="col-span-9">
          <SortProductList/>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {Array(30).fill(0).map((_, index)=>
              <div className="col-span-1" key={index}>
                <Products/>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
}
