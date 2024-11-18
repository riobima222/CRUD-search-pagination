// HOOKS
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import { generatePagination } from "@/lib/utils";

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  // Membuat URL dengan nomor halaman baru
  const createPageUrl = (pageNumber: string | number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Generate daftar halaman
  const allPages = generatePagination(currentPage, totalPages);

  // Komponen nomor halaman
  const PaginationNumber = ({
    page,
    href,
    position,
    isActive,
  }: {
    page: number | string;
    href: string;
    position?: "first" | "last" | "middle" | "single";
    isActive: boolean;
  }) => {
    // Kelas CSS dinamis untuk styling
    const className = clsx(
      "flex h-10 w-10 items-center justify-center text-sm border",
      {
        "rounded-l-sm": position === "first" || position === "single",
        "rounded-r-sm": position === "last" || position === "single",
        "z-10 bg-blue-600 text-white border-blue-600": isActive,
        "hover:bg-gray-100": !isActive && position !== "middle",
        "text-gray-300 pointer-events-none": page === "...",
      }
    );

    // Render berbeda untuk halaman aktif dan ellipsis
    if (page === "...") {
      return <div className={className}>{page}</div>;
    }

    return (
      <Link
        href={href}
        className={className}
        aria-current={isActive ? "page" : undefined}
      >
        {page}
      </Link>
    );
  };

  // Komponen panah navigasi
  const PaginationArrow = ({
    href,
    direction,
    isDisabled,
  }: {
    href: string;
    direction: "left" | "right";
    isDisabled?: boolean;
  }) => {
    // Kelas CSS dinamis untuk panah
    const className = clsx(
      "flex h-10 w-10 items-center justify-center text-sm border rounded",
      {
        "pointer-events-none text-gray-300": isDisabled,
        "hover:bg-gray-100": !isDisabled,
        "mr-2": direction === "left",
        "ml-2": direction === "right",
      }
    );

    // Pilih ikon berdasarkan arah
    const icon =
      direction === "left" ? (
        <HiChevronLeft size={20} />
      ) : (
        <HiChevronRight size={20} />
      );

    // Render berbeda untuk tombol disabled
    return isDisabled ? (
      <div className={className} aria-disabled="true">
        {icon}
      </div>
    ) : (
      <Link
        href={href}
        className={className}
        aria-label={`Go to ${direction === "left" ? "previous" : "next"} page`}
      >
        {icon}
      </Link>
    );
  };

  return (
    <nav
      role="navigation"
      aria-label="Pagination Navigation"
      className="inline-flex items-center"
    >
      {/* Panah kiri */}
      <PaginationArrow
        direction="left"
        href={createPageUrl(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      {/* Nomor halaman */}
      <div className="flex -space-x-px">
        {allPages.map((page, index) => {
          // Tentukan posisi untuk styling
          let position: "first" | "last" | "single" | "middle" | undefined;
          if (index === 0) position = "first";
          if (index === allPages.length - 1) position = "last";
          if (allPages.length === 1) position = "single";
          if (page === "...") position = "middle";

          return (
            <PaginationNumber
              key={index}
              href={createPageUrl(page)}
              page={page}
              position={position}
              isActive={currentPage === page}
            />
          );
        })}
      </div>

      {/* Panah kanan */}
      <PaginationArrow
        direction="right"
        href={createPageUrl(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </nav>
  );
};

export default Pagination;
