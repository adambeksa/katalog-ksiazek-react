# Sklep Internetowy - Projekt React

Projekt sklepu internetowego zbudowany w React z wykorzystaniem Clean Architecture, React Router i nowoczesnych praktyk programistycznych.

## Architektura

Projekt został zorganizowany zgodnie z zasadami **Clean Architecture**, co zapewnia:
- **Separację odpowiedzialności** - każda warstwa ma jasno określone zadania
- **Niezależność od frameworków** - logika biznesowa nie zależy od React
- **Łatwość testowania** - każda warstwa może być testowana niezależnie
- **Skalowalność** - łatwe dodawanie nowych funkcjonalności

### Warstwy architektury

1. **Domain Layer** (`src/domain/`)
   - Encje biznesowe (`entities/Product.js`)
   - Interfejsy repozytoriów (`repositories/IProductRepository.js`)
   - Logika biznesowa i reguły domenowe

2. **Application Layer** (`src/application/`)
   - Use Cases (`use-cases/`) - konkretne przypadki użycia
   - Serwisy (`services/ProductService.js`) - koordynacja use cases

3. **Infrastructure Layer** (`src/infrastructure/`)
   - Implementacje repozytoriów (`repositories/ProductRepository.js`)
   - Źródła danych (`data/mockProducts.js`)
   - Integracje zewnętrzne (API, bazy danych)

4. **Presentation Layer** (`src/presentation/`)
   - Komponenty React (`components/`, `pages/`)
   - Hooki (`hooks/`) - łączą warstwę prezentacji z aplikacją
   - Style i UI

## Struktura projektu

Projekt składa się z trzech głównych stron:

1. **Strona główna** (`/`) - Strona powitalna z informacjami o sklepie i podglądem popularnych produktów
2. **Listing produktów** (`/produkty`) - Lista wszystkich produktów z możliwością filtrowania i sortowania
3. **Karta produktu** (`/produkt/:id`) - Szczegółowy widok pojedynczego produktu

## Funkcjonalności

- ✅ Routing między stronami (React Router)
- ✅ Responsywny design
- ✅ Filtrowanie produktów według kategorii
- ✅ Sortowanie produktów (nazwa, cena)
- ✅ Szczegółowy widok produktu
- ✅ Symulacja dodawania do koszyka
- ✅ Nowoczesny i przyjazny interfejs użytkownika

## Instalacja

1. Zainstaluj zależności:
```bash
npm install
```

2. Uruchom serwer deweloperski:
```bash
npm run dev
```

3. Otwórz przeglądarkę i przejdź do `http://localhost:5173`

## Budowanie projektu

Aby zbudować projekt produkcyjny:

```bash
npm run build
```

Aby podglądnąć zbudowany projekt:

```bash
npm run preview
```

## Technologie

- **React 18** - Biblioteka do budowania interfejsów użytkownika
- **React Router DOM 6** - Routing w aplikacji React
- **Vite** - Narzędzie do budowania i dewelopmentu
- **CSS3** - Stylowanie komponentów

## Struktura katalogów

```
src/
├── domain/                    # Warstwa domeny
│   ├── entities/             # Encje biznesowe
│   │   └── Product.js
│   └── repositories/         # Interfejsy repozytoriów
│       └── IProductRepository.js
├── application/              # Warstwa aplikacji
│   ├── use-cases/           # Przypadki użycia
│   │   ├── GetProductsUseCase.js
│   │   ├── GetProductByIdUseCase.js
│   │   ├── FilterProductsUseCase.js
│   │   └── GetCategoriesUseCase.js
│   └── services/            # Serwisy aplikacyjne
│       └── ProductService.js
├── infrastructure/          # Warstwa infrastruktury
│   ├── repositories/        # Implementacje repozytoriów
│   │   └── ProductRepository.js
│   └── data/                # Źródła danych
│       └── mockProducts.js
├── presentation/            # Warstwa prezentacji
│   ├── components/          # Komponenty UI (shared)
│   │   ├── Layout.jsx
│   │   ├── Layout.css
│   │   ├── ProductBoxListing.jsx
│   │   └── ProductBoxListing.css
│   ├── hooks/               # Hooki React
│   │   ├── useProducts.js
│   │   ├── useProduct.js
│   │   └── useFilteredProducts.js
│   └── pages/               # Strony aplikacji (container/presentational)
│       ├── Home/
│       │   ├── Home.jsx
│       │   └── Home.css
│       ├── ProductListing/
│       │   ├── ProductListing.jsx
│       │   └── ProductListing.css
│       └── ProductCard/
│           ├── ProductCard.jsx
│           └── ProductCard.css
├── styles/                  # Globalne style
├── App.jsx                  # Główny komponent z routingiem
└── main.jsx                # Punkt wejścia aplikacji
```

## Zasady Clean Architecture w projekcie

### Zależności między warstwami

- **Prezentacja** → **Aplikacja** → **Domena**
- **Infrastruktura** → **Domena**
- **Prezentacja** → **Infrastruktura** (tylko przez hooki)

### Przykład przepływu danych

1. Komponent React (Prezentacja) wywołuje hook `useProducts()`
2. Hook tworzy instancje repozytorium (Infrastruktura) i serwisu (Aplikacja)
3. Serwis wykonuje use case, który używa repozytorium
4. Repozytorium zwraca encje domenowe (Domena)
5. Dane przepływają z powrotem do komponentu przez hook

## Rozwój projektu

Projekt można rozbudować o:
- Integrację z backendem/API
- System logowania użytkowników
- Koszyk zakupów z persystencją danych
- System płatności
- Panel administracyjny
- Recenzje i oceny produktów
- Wyszukiwarkę produktów

