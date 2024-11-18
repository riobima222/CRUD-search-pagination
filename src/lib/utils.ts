export const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const formatter = new Intl.DateTimeFormat("id-ID", {
        dateStyle: "medium",
        timeStyle: "short"
    })
    return formatter.format(date);
}


export const generatePagination = (currentPage: number, totalPages: number): (number | string)[] => {
    // Jika total halaman 7 atau kurang, tampilkan semua nomor halaman
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Jika current page berada di awal (3 halaman pertama)
    if (currentPage <= 3) {
        return [1, 2, 3, "...", totalPages - 1, totalPages];
    }

    // Jika current page berada di akhir (3 halaman terakhir)
    if (currentPage >= totalPages - 2) {
        return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
    }
    
    // Untuk halaman tengah, tampilkan range dengan ellipsis
    return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
    ];
}