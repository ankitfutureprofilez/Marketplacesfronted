import React, { useState } from "react";
import Listing from "../Apis/Listing";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

const DeletePopup = ({ item, fetchTeamList, step = 1 }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Open confirmation modal
    const openModal = () => {
        setIsOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setIsOpen(false);
    };

    // Unified delete handler based on step
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const main = new Listing();
            let response;

            if (step === 1) {
                // Team deletion
                response = await main.deleteteam({ _id: item._id });
            } else if (step === 2) {
                // Job deletion
                response = await main.JobDelete({ _id: item._id });
            } 
             else if (step === 3) {
                // Job deletion
                response = await main.BlogDelete({ _id: item._id });
            }
             else if (step === 4) {
                // Job deletion
                response = await main.ProjectDelete({ _id: item._id });
            }
            else {
                throw new Error("Unknown delete step provided");
            }

            toast.success(response?.data?.message || "Deleted successfully");
            closeModal();
            fetchTeamList(); // Refresh list
        } catch (error) {
            console.error("Delete Error:", error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Trigger Button */}
            <button
                onClick={openModal}
                className="bg-red-600 text-white px-2 py-2 rounded hover:bg-red-700"
            >
                <MdDelete />
            </button>

            {/* Delete Confirmation Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-3 right-4 text-gray-600 hover:text-black text-2xl font-bold"
                        >
                            &times;
                        </button>

                        <h2 className="text-2xl font-semibold mb-4 text-center">Confirm Deletion</h2>
                        <p className="text-gray-700 text-center mb-6">
                            Are you sure you want to delete this item?
                        </p>

                        <div className="flex justify-center gap-4">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                {loading ? "Processing..." : "Yes, Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeletePopup;
