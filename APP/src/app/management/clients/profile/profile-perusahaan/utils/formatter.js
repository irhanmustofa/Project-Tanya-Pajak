export const formatDate = (dateString) => {
    if (!dateString) return "-";
    // Handle berbagai format tanggal
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            // Jika tidak bisa parse sebagai Date, return as is
            return dateString;
        }
        return date.toLocaleDateString("id-ID");
    } catch {
        return dateString;
    }
};

export const formatCurrency = (amount) => {
    if (!amount) return "-";
    return new Intl.NumberFormat("id-ID").format(amount);
};