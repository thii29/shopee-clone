export default function Footer() {
  return (
    <footer className='py-16 bg-neutral-100'>
      <div className="max-w-7xl mx-auto px-4">
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        <div className='lg:col-span-1'>
          <div>© 2024 Shopee. All Rights Reserved .</div>
        </div>
          <div className='lg:col-span-2'>
            <div>
            Country & Region: Singapore Indonesia Thailand Malaysia Vietnam Philippines Brazil México Colombia Chile Taiwan
           </div>
         </div>
        </div>
        <div className="text-center text-sm mt-10">
          <div>Shopee Company Limited</div>
          <div className="mt-6">
            Floors 4-5-6, Capital Place Building, No. 29, Lieu Giai Street, Ngoc Khanh ward, Ba Dinh District, Hanoi, Vietnam
          </div>
          <div className="mt-2">
            Person in charge of information management: Nguyen Bui Anh Tuan
          </div>
          <div className="mt-2">
            Business Registration Certificate No: 0106773786
          </div>
          <div className="mt-2">
            © 2015 - Copyright belongs to Shopee Company Limited
          </div>          
        </div>
      </div>
    </footer>
  )
}
