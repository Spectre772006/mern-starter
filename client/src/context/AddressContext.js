import { createContext, useContext, useState } from "react";

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const addAddress = (address) => {
    const newAddress = { ...address, id: Date.now() };
    setAddresses((prev) => [...prev, newAddress]);
    setSelectedAddressId(newAddress.id);
  };

  const [editingAddress, setEditingAddress] = useState(null);
  const updateAddress = (id, updatedAddress) => {
    setAddresses((prev) =>
      prev.map((addr) =>
        addr.id === id ? { ...addr, ...updatedAddress } : addr
     
    
      )
    );
  };

  const deleteAddress = (id) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    setSelectedAddressId((prev) => (prev === id ? null : prev));
  };
const startEditAddress = (address) => {
  setEditingAddress(address);
};

const clearEditAddress = () => {
  setEditingAddress(null);
};

  const selectAddress = (id) => {
    setSelectedAddressId(id);
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        selectedAddressId,
        addAddress,
        updateAddress,
        deleteAddress,
        selectAddress,
        startEditAddress,
    clearEditAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => useContext(AddressContext);
