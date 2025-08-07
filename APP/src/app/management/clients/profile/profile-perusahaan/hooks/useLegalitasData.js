import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import { useState, useEffect } from "react";

export const useLegalitasData = (initialData = []) => {
    const [legalitasData, setLegalitasData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingLegalitas, setEditingLegalitas] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
    const [pendingDeleteIndex, setPendingDeleteIndex] = useState(null);


    useEffect(() => {
        setLegalitasData(initialData);
    }, [initialData]);

    const handleAddLegalitas = () => {
        setIsEditMode(false);
        setEditingLegalitas(null);
        setModalOpen(true);
    };

    const handleEditLegalitas = (item, index) => {
        setIsEditMode(true);
        setEditingLegalitas({ ...item, index });
        setModalOpen(true);
    };

    const handleSaveLegalitas = (data) => {
        if (isEditMode && editingLegalitas) {
            // Update existing
            const updated = [...legalitasData];
            updated[editingLegalitas.index] = data;
            setLegalitasData(updated);
        } else {
            // Add new
            setLegalitasData([...legalitasData, data]);
        }
        setModalOpen(false);
        setEditingLegalitas(null);
    };

    const handleDeleteLegalitas = (index) => {
        setPendingDeleteIndex(index);
        setDeleteConfirmModal(true);
    };

    const confirmDeleteLegalitas = () => {
        if (pendingDeleteIndex !== null) {
            const updated = legalitasData.filter((_, i) => i !== pendingDeleteIndex);
            setLegalitasData(updated);
            setPendingDeleteIndex(null);
        }
        setDeleteConfirmModal(false);
    };

    const cancelDeleteLegalitas = () => {
        setPendingDeleteIndex(null);
        setDeleteConfirmModal(false);
    };

    // Get the item that will be deleted for display in modal
    const getDeleteItem = () => {
        if (pendingDeleteIndex !== null && legalitasData[pendingDeleteIndex]) {
            return legalitasData[pendingDeleteIndex];
        }
        return null;
    };

    return {
        legalitasData,
        modalOpen,
        setModalOpen,
        editingLegalitas,
        isEditMode,
        deleteConfirmModal,
        handleAddLegalitas,
        handleEditLegalitas,
        handleSaveLegalitas,
        handleDeleteLegalitas,
        confirmDeleteLegalitas,
        cancelDeleteLegalitas,
        getDeleteItem,
    };
};