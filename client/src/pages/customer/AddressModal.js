import { useEffect, useState } from "react";
import { useAddress } from "../../context/AddressContext";

export default function AddressModal({ onClose }) {
  const {
    addAddress,
    updateAddress,
    editingAddress,
    clearEditAddress,
  } = useAddress();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    if (editingAddress) {
      setForm(editingAddress);
    }
  }, [editingAddress]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingAddress) {
      updateAddress(editingAddress.id, form);
      clearEditAddress();
    } else {
      addAddress(form);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-[480px] max-w-[90%]">
        <h2 className="text-lg font-bold mb-4">
          {editingAddress ? "Edit Address" : "Add New Address"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {["name", "phone", "addressLine", "city", "state", "pincode"].map(
            (field) => (
              <input
                key={field}
                name={field}
                value={form[field]}
                onChange={handleChange}
                placeholder={field}
                className="w-full border p-2"
                required
              />
            )
          )}

          <div className="flex justify-end gap-3 pt-3">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="bg-yellow-400 px-4 py-2 font-semibold"
            >
              Save Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
