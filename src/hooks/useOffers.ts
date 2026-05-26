"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ApiService } from "@/services";
import { OfferResponseDto } from "@/models/offer.model";

const PAGE_SIZE = 10;

/**
 * Hook para gerenciar a listagem de ofertas com busca e scroll infinito (virtualizado).
 */
export function useOffers() {
  const [search, setSearch] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [offers, setOffers] = useState<OfferResponseDto[]>([]);
  const [loadedPages, setLoadedPages] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const loadedPagesRef = useRef<Set<number>>(new Set());
  const fetchingPagesRef = useRef<Set<number>>(new Set());

  const fetchOffers = useCallback(
    async (page: number, searchValue = search) => {
      // Se já carregou ou está carregando a página, ignora
      if (
        loadedPagesRef.current.has(page) ||
        fetchingPagesRef.current.has(page)
      ) {
        return;
      }

      fetchingPagesRef.current.add(page);
      setLoading(true);

      try {
        const response = await ApiService.offers.getAll({
          page,
          limit: PAGE_SIZE,
          search: searchValue,
        });

        setOffers((prev) => {
          const merged =
            page === 1 ? Array(response.total).fill(undefined) : [...prev];

          (response.data || []).forEach((item: OfferResponseDto, i: number) => {
            const index = (page - 1) * PAGE_SIZE + i;
            if (index < merged.length) {
              merged[index] = item;
            }
          });
          return merged;
        });

        loadedPagesRef.current.add(page);
        setLoadedPages(Array.from(loadedPagesRef.current));
      } catch (error) {
        console.error("Erro ao buscar ofertas:", error);
      } finally {
        fetchingPagesRef.current.delete(page);
        setLoading(false);
      }
    },
    [search],
  );

  useEffect(() => {
    // Reset total ao mudar busca
    loadedPagesRef.current.clear();
    fetchingPagesRef.current.clear();
    setLoadedPages([]);
    fetchOffers(1, search);
  }, [search, fetchOffers]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoadedPages([]);
    setOffers([]);
    setSearch(searchInput);
  };

  const loadMore = (lastIndex: number) => {
    const neededPage = Math.floor(lastIndex / PAGE_SIZE) + 1;
    if (!loadedPages.includes(neededPage) && !loading) {
      fetchOffers(neededPage, search);
    }
  };

  return {
    offers,
    loading,
    searchInput,
    setSearchInput,
    handleSearch,
    loadMore,
    search,
  };
}
