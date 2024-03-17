import React, { useState } from 'react'
import AddressCard from './AddressCard'
import AddresFormModal from './AddresFormModal';

const AddressComponent = () => {
    const [openAddressModal, setOpenAddressModal] = useState(false);
  return (
    <div>
        <AddressCard  setOpenAddressModal={setOpenAddressModal}/>
        {openAddressModal && <AddresFormModal openAddressModal={openAddressModal} setOpenAddressModal={setOpenAddressModal}/>}
    </div>
  )
}

export default AddressComponent