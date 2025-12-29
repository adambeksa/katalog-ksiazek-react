# Sklep Internetowy (Pet Project)

Projekt sklepu internetowego oparty na nowoczesnej architekturze modułowej i Clean Architecture.

## 🚀 Technologie

*   **Frontend:** React 18, Vite
*   **State Management:** React Query (TanStack Query)
*   **HTTP Client:** Axios
*   **Mocking:** Axios Mock Adapter
*   **Routing:** React Router DOM

## 🏗 Architektura

Projekt wykorzystuje **Clean Architecture** z podziałem na moduły biznesowe.

### Struktura katalogów (`src/modules/`)

Każdy moduł (np. `product`) jest podzielony na warstwy:

1.  **Presentation (`presentation/`)**
    *   Widoki (Pages), Komponenty, Hooki.
    *   Odpowiada za to, co widzi użytkownik.
    *   Korzysta z warstwy Application (Fasady).

2.  **Application (`application/`)**
    *   Serwisy aplikacyjne / Fasady (np. `ProductFacade`, `ProductFilterFacade`).
    *   `ProductFacade`: Odpowiada za pobieranie danych.
    *   `ProductFilterFacade`: Odpowiada za operacje filtrowania.
    *   Orkiestruje przepływ danych między domeną a infrastrukturą.

3.  **Domain (`domain/`)**
    *   Czysta logika biznesowa i modele (np. `Product`).
    *   Serwisy domenowe (np. `ProductFilterService` - logika filtrowania).
    *   Interfejsy domenowe (np. `ProductFilters`, `FilterOptions`).

4.  **Infrastructure (`infrastructure/`)**
    *   Implementacja dostępu do danych (np. `ProductDataService`).
    *   Adaptery (`ProductListAdapter`, `ProductDetailAdapter`) - mapowanie DTO na encje.
    *   Komunikacja z API (Axios).
    *   Mockowanie danych.

### Wstrzykiwanie Zależności (DI)

W projekcie stosujemy ręczne wstrzykiwanie zależności (Dependency Injection) w warstwie aplikacji, aby zachować testowalność i separację.
Instancje serwisów są tworzone i eksportowane jako singletony (np. w `ProductFacade.js`).

## 🛠 Setup i Uruchomienie

1.  **Instalacja zależności:**
    ```bash
    npm install
    ```

2.  **Uruchomienie serwera deweloperskiego:**
    ```bash
    npm run dev
    ```

3.  **Budowanie wersji produkcyjnej:**
    ```bash
    npm run build
    ```

## 🔌 API i Mocking

Projekt działa w trybie **offline-first** dzięki `axios-mock-adapter`.
Wszystkie zapytania HTTP są przechwytywane i obsługiwane lokalnie przez `ProductDataService`, symulując prawdziwe API (opóźnienia, statusy błędów, filtrowanie).

Aby podłączyć prawdziwe API, wystarczy usunąć konfigurację mocka w `src/modules/product/infrastructure/data-services/ProductDataService.js`.
