--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.5 (Debian 17.5-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: CategoryType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."CategoryType" AS ENUM (
    'PRODUCT',
    'SERVICE'
);


ALTER TYPE public."CategoryType" OWNER TO postgres;

--
-- Name: LocalItemDescriptionType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."LocalItemDescriptionType" AS ENUM (
    'TEXT',
    'IMAGE',
    'VIDEO',
    'LINK'
);


ALTER TYPE public."LocalItemDescriptionType" OWNER TO postgres;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'USER',
    'ADMIN',
    'MODERATOR'
);


ALTER TYPE public."Role" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    image text,
    type public."CategoryType" NOT NULL,
    is_excluded boolean DEFAULT false NOT NULL,
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated timestamp(3) without time zone NOT NULL,
    parent_id text
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: forms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.forms (
    id text NOT NULL,
    sender_name text NOT NULL,
    company_name text,
    phone_number text NOT NULL,
    email text NOT NULL,
    message text NOT NULL,
    ip_address text NOT NULL,
    is_read boolean DEFAULT false NOT NULL,
    is_answered boolean DEFAULT false NOT NULL,
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated timestamp(3) without time zone NOT NULL,
    locale_id text
);


ALTER TABLE public.forms OWNER TO postgres;

--
-- Name: item_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.item_images (
    id text NOT NULL,
    image text NOT NULL,
    is_excluded boolean DEFAULT false NOT NULL,
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated timestamp(3) without time zone NOT NULL,
    product_id text,
    service_id text
);


ALTER TABLE public.item_images OWNER TO postgres;

--
-- Name: local_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.local_categories (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    is_excluded boolean DEFAULT false NOT NULL,
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated timestamp(3) without time zone NOT NULL,
    category_id text NOT NULL,
    locale_id text NOT NULL
);


ALTER TABLE public.local_categories OWNER TO postgres;

--
-- Name: local_item_descriptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.local_item_descriptions (
    id text NOT NULL,
    content text NOT NULL,
    title text,
    type public."LocalItemDescriptionType" NOT NULL,
    "order" double precision NOT NULL,
    is_excluded boolean DEFAULT false NOT NULL,
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated timestamp(3) without time zone NOT NULL,
    local_product_id text,
    local_service_id text
);


ALTER TABLE public.local_item_descriptions OWNER TO postgres;

--
-- Name: local_products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.local_products (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    price double precision NOT NULL,
    discount_price double precision,
    is_excluded boolean DEFAULT false NOT NULL,
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated timestamp(3) without time zone NOT NULL,
    product_id text NOT NULL,
    locale_id text NOT NULL
);


ALTER TABLE public.local_products OWNER TO postgres;

--
-- Name: local_services; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.local_services (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    price double precision NOT NULL,
    discount_price double precision,
    is_excluded boolean DEFAULT false NOT NULL,
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated timestamp(3) without time zone NOT NULL,
    service_id text NOT NULL,
    locale_id text NOT NULL
);


ALTER TABLE public.local_services OWNER TO postgres;

--
-- Name: locales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locales (
    id text NOT NULL,
    name text NOT NULL,
    language text NOT NULL,
    symbol text NOT NULL,
    currency text NOT NULL,
    currency_symbol text NOT NULL,
    phone_code text NOT NULL,
    image text NOT NULL,
    is_excluded boolean DEFAULT false NOT NULL,
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.locales OWNER TO postgres;

--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    image text NOT NULL,
    "price_USD" double precision NOT NULL,
    "discount_price_USD" double precision,
    is_excluded boolean DEFAULT false NOT NULL,
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated timestamp(3) without time zone NOT NULL,
    category_id text NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: services; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.services (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    image text NOT NULL,
    "price_USD" double precision NOT NULL,
    "discount_price_USD" double precision,
    is_excluded boolean DEFAULT false NOT NULL,
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated timestamp(3) without time zone NOT NULL,
    category_id text NOT NULL
);


ALTER TABLE public.services OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id text NOT NULL,
    email text NOT NULL,
    hashed_password text NOT NULL,
    first_name text,
    last_name text,
    phone_number text,
    image text,
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL,
    is_banned boolean DEFAULT false NOT NULL,
    locale_id text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name, description, image, type, is_excluded, created, updated, parent_id) FROM stdin;
ee08867b-869b-447a-acca-63477db9bf0b	Building Materials	Wide selection of building materials for construction, renovation, and home improvement projects.	/static/categories/categorie_1757404814300_building-materials.webp	PRODUCT	f	2025-09-09 08:00:14.304	2025-09-09 08:00:14.304	\N
4b756ffa-83ed-4cff-b87b-06f371ac9548	Interior	Materials and solutions for stylish and durable interiors – from flooring to wall decoration.	/static/categories/categorie_1757404878950_interior.png	PRODUCT	f	2025-09-09 08:01:18.962	2025-09-09 08:01:18.962	ee08867b-869b-447a-acca-63477db9bf0b
30a7b5ba-6ae8-4fd5-a87a-fcebc5c18524	Tiles	Wide selection of ceramic and porcelain tiles for floors and walls. Perfect for both interior and exterior applications. Durable, stylish, and available in various sizes and finishes.	/static/categories/categorie_1757404980931_tiles.jpg	PRODUCT	f	2025-09-09 08:03:00.937	2025-09-09 08:03:00.937	4b756ffa-83ed-4cff-b87b-06f371ac9548
\.


--
-- Data for Name: forms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.forms (id, sender_name, company_name, phone_number, email, message, ip_address, is_read, is_answered, created, updated, locale_id) FROM stdin;
\.


--
-- Data for Name: item_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.item_images (id, image, is_excluded, created, updated, product_id, service_id) FROM stdin;
a65d7858-483b-410f-babd-6cb44096f5ce	/static/item_images/item_image_1757428975582_golden-tile-meloren-grey.jpg	f	2025-09-09 14:42:55.599	2025-09-09 14:42:55.599	0ddd26d3-b365-4d77-9063-e3246954c29d	\N
a5a5f187-899d-4db7-9a49-c697e8287a23	/static/item_images/item_image_1757429210478_golden-tile-meloren-gold.jpg	f	2025-09-09 14:46:50.49	2025-09-09 14:46:50.49	0ddd26d3-b365-4d77-9063-e3246954c29d	\N
\.


--
-- Data for Name: local_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.local_categories (id, name, description, is_excluded, created, updated, category_id, locale_id) FROM stdin;
\.


--
-- Data for Name: local_item_descriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.local_item_descriptions (id, content, title, type, "order", is_excluded, created, updated, local_product_id, local_service_id) FROM stdin;
aa75b05c-3c91-4862-a0c9-ce766a590e04	Rozmiar: 600×600×9.5mm beżowy (±0.1%) | Materiał: Gres porcelanowy techniczny | Powierzchnia: Matowa | Tolerancja grubości: ±5% | Waga na m²: 22 kg | Wytrzymałość na zginanie: >1800N | Moduł pękania: >35 MPa | Nasiąkliwość wodą: ≤0.5% (EN ISO 10545-3) | Odporność na ścieranie: PEI IV (EN ISO 10545-7) | Antypoślizgowość: R10 (DIN 51130) | Mrozoodporność: 100+ cykle	Specyfikacje techniczne	TEXT	1	f	2025-09-09 15:16:35.391	2025-09-09 15:16:35.391	d2d6041c-45fb-4b88-b1fc-884fd9c5947f	\N
280cee5f-9cdf-462b-9ff6-dc77cd0f8a99	Współczynnik rozszerzalności cieplnej: 7×10⁻⁶°C⁻¹ | Odporność chemiczna: Class A (EN ISO 10545-13) | Odporność na plamy: Class 5 (EN ISO 10545-14) | Klasa ogniowa: A1fl (EN 13501-1) | Odporność na głębokie ścieranie: ≤145 mm³ | Odchylenia wymiarowe: ±0,6% maks | Krawędzie rektyfikowane | Twardość Mohsa: 6-7	Właściwości fizyczno-chemiczne	TEXT	2	f	2025-09-09 15:16:35.405	2025-09-09 15:16:35.405	d2d6041c-45fb-4b88-b1fc-884fd9c5947f	\N
45cef79b-900e-47da-a84f-398762d21393	Zalecane do stref intensywnego ruchu komercyjnego. Kompatybilne z systemami ogrzewania podłogowego (maks 27°C). Montaż klejem klasy C2TE dla płytek wielkoformatowych. Szerokość fugi: 2-4mm. Można montować na ścianach z odpowiednim wsparciem. Nadaje się do basenów i stref mokrych	Montaż i zastosowanie	TEXT	3	f	2025-09-09 15:16:35.409	2025-09-09 15:16:35.409	d2d6041c-45fb-4b88-b1fc-884fd9c5947f	\N
21e5f978-dd90-41cb-a9ab-a3ba2b1de413	Certyfikat GREENGUARD Gold dla jakości powietrza | Zawiera 20% materiałów z recyklingu | Niskie emisje VOC | Bez ołowiu i kadmu | Antymikrobowa obróbka powierzchni | Łatwa konserwacja neutralnymi środkami czyszczącymi | Pełny recykling na końcu okresu użytkowania	Środowisko i bezpieczeństwo	TEXT	4	f	2025-09-09 15:16:35.418	2025-09-09 15:16:35.418	d2d6041c-45fb-4b88-b1fc-884fd9c5947f	\N
0ebd9d9c-33bd-46c1-bea4-d84360fd652b	Rozmiar: 600×600×9,5mm (±0,1%) | Materiał: Gres porcelanowy techniczny | Powierzchnia: Matowa | Tolerancja grubości: ±5% | Waga na m²: 22 kg | Wytrzymałość na zginanie: >1800N | Moduł pękania: >35 MPa | Nasiąkliwość wodą: ≤0,5% (EN ISO 10545-3) | Odporność na ścieranie: PEI IV (EN ISO 10545-7) | Antypoślizgowość: R10 (DIN 51130) | Mrozoodporność: 100+ cykle	Specyfikacje techniczne	TEXT	1	f	2025-09-09 15:16:35.429	2025-09-09 15:16:35.429	de142d0f-75f4-4a67-a34d-b76ac49c1078	\N
50878b2d-61da-4e2b-9246-0d3a395170a8	Współczynnik rozszerzalności cieplnej: 7×10⁻⁶°C⁻¹ | Odporność chemiczna: Klasa A (EN ISO 10545-13) | Odporność na plamy: Klasa 5 (EN ISO 10545-14) | Klasa ogniowa: A1fl (EN 13501-1) | Odporność na głębokie ścieranie: ≤145 mm³ | Odchylenia wymiarowe: ±0,6% maks | Krawędzie rektyfikowane | Twardość Mohsa: 6-7	Właściwości fizyczno-chemiczne	TEXT	2	f	2025-09-09 15:16:35.438	2025-09-09 15:16:35.438	de142d0f-75f4-4a67-a34d-b76ac49c1078	\N
86026f1b-d909-4933-9e42-9c4f8cc9c96e	Zalecane do stref intensywnego ruchu komercyjnego. Kompatybilne z systemami ogrzewania podłogowego (maks 27°C). Montaż klejem klasy C2TE dla płytek wielkoformatowych. Szerokość fugi: 2-4mm. Można montować na ścianach z odpowiednim wsparciem. Nadaje się do basenów i stref mokrych	Montaż i zastosowanie	TEXT	3	f	2025-09-09 15:16:35.446	2025-09-09 15:16:35.446	de142d0f-75f4-4a67-a34d-b76ac49c1078	\N
ca9c12b3-71c4-4cba-94e3-e7a0841c7d56	Certyfikat GREENGUARD Gold dla jakości powietrza | Zawiera 20% materiałów z recyklingu | Niskie emisje VOC | Bez ołowiu i kadmu | Antymikrobowa obróbka powierzchni | Łatwa konserwacja neutralnymi środkami czyszczącymi | Pełny recykling na końcu okresu użytkowania	Środowisko i bezpieczeństwo	TEXT	4	f	2025-09-09 15:16:35.451	2025-09-09 15:16:35.451	de142d0f-75f4-4a67-a34d-b76ac49c1078	\N
d030c8a6-7a86-4206-be1c-2d0831c9ac9b	Rozmiar: 600×600×9.5mm beżowy (±0.1%) | Materiał: Gres porcelanowy techniczny | Powierzchnia: Matowa | Tolerancja grubości: ±5% | Waga na m²: 22 kg | Wytrzymałość na zginanie: >1800N | Moduł pękania: >35 MPa | Nasiąkliwość wodą: ≤0.5% (EN ISO 10545-3) | Odporność na ścieranie: PEI IV (EN ISO 10545-7) | Antypoślizgowość: R10 (DIN 51130) | Mrozoodporność: 100+ cykle	Specyfikacje techniczne	TEXT	1	f	2025-09-09 15:16:35.461	2025-09-09 15:16:35.461	069e087d-780c-41d8-a77a-44f1b8932c4d	\N
8022f7af-f604-4f34-a7cc-bef57770371c	Współczynnik rozszerzalności cieplnej: 7×10⁻⁶°C⁻¹ | Odporność chemiczna: Class A (EN ISO 10545-13) | Odporność na plamy: Class 5 (EN ISO 10545-14) | Klasa ogniowa: A1fl (EN 13501-1) | Odporność na głębokie ścieranie: ≤145 mm³ | Odchylenia wymiarowe: ±0,6% maks | Krawędzie rektyfikowane | Twardość Mohsa: 6-7	Właściwości fizyczno-chemiczne	TEXT	2	f	2025-09-09 15:16:35.465	2025-09-09 15:16:35.465	069e087d-780c-41d8-a77a-44f1b8932c4d	\N
0b1edaa7-0217-47d4-95c9-7299bd765aac	Zalecane do stref intensywnego ruchu komercyjnego. Kompatybilne z systemami ogrzewania podłogowego (maks 27°C). Montaż klejem klasy C2TE dla płytek wielkoformatowych. Szerokość fugi: 2-4mm. Można montować na ścianach z odpowiednim wsparciem. Nadaje się do basenów i stref mokrych	Montaż i zastosowanie	TEXT	3	f	2025-09-09 15:16:35.47	2025-09-09 15:16:35.47	069e087d-780c-41d8-a77a-44f1b8932c4d	\N
29427633-1142-4899-a1b0-0680dde09b3b	Certyfikat GREENGUARD Gold dla jakości powietrza | Zawiera 20% materiałów z recyklingu | Niskie emisje VOC | Bez ołowiu i kadmu | Antymikrobowa obróbka powierzchni | Łatwa konserwacja neutralnymi środkami czyszczącymi | Pełny recykling na końcu okresu użytkowania	Środowisko i bezpieczeństwo	TEXT	4	f	2025-09-09 15:16:35.477	2025-09-09 15:16:35.477	069e087d-780c-41d8-a77a-44f1b8932c4d	\N
f4085e9a-3d4c-47c6-9b86-c31d731158aa	Rozmiar: 600×600×9.5mm szary (±0.1%) | Materiał: Gres porcelanowy techniczny | Powierzchnia: Matowa | Tolerancja grubości: ±5% | Waga na m²: 22 kg | Wytrzymałość na zginanie: >1800N | Moduł pękania: >35 MPa | Nasiąkliwość wodą: ≤0.5% (EN ISO 10545-3) | Odporność na ścieranie: PEI IV (EN ISO 10545-7) | Antypoślizgowość: R10 (DIN 51130) | Mrozoodporność: 100+ cykle	Specyfikacje techniczne	TEXT	1	f	2025-09-09 15:16:35.486	2025-09-09 15:16:35.486	9b4c1940-02c9-48f2-886f-db73ac6deb93	\N
0cc610f9-ea4b-4677-83d4-80382ecf93a2	Współczynnik rozszerzalności cieplnej: 7×10⁻⁶°C⁻¹ | Odporność chemiczna: Class A (EN ISO 10545-13) | Odporność na plamy: Class 5 (EN ISO 10545-14) | Klasa ogniowa: A1fl (EN 13501-1) | Odporność na głębokie ścieranie: ≤145 mm³ | Odchylenia wymiarowe: ±0,6% maks | Krawędzie rektyfikowane | Twardość Mohsa: 6-7	Właściwości fizyczno-chemiczne	TEXT	2	f	2025-09-09 15:16:35.491	2025-09-09 15:16:35.491	9b4c1940-02c9-48f2-886f-db73ac6deb93	\N
d73633cb-d471-42dc-9c9c-7cb1ab9754c9	Zalecane do stref intensywnego ruchu komercyjnego. Kompatybilne z systemami ogrzewania podłogowego (maks 27°C). Montaż klejem klasy C2TE dla płytek wielkoformatowych. Szerokość fugi: 2-4mm. Można montować na ścianach z odpowiednim wsparciem. Nadaje się do basenów i stref mokrych	Montaż i zastosowanie	TEXT	3	f	2025-09-09 15:16:35.499	2025-09-09 15:16:35.499	9b4c1940-02c9-48f2-886f-db73ac6deb93	\N
be2d71b8-2018-4b78-ab5e-78076707e95b	Certyfikat GREENGUARD Gold dla jakości powietrza | Zawiera 20% materiałów z recyklingu | Niskie emisje VOC | Bez ołowiu i kadmu | Antymikrobowa obróbka powierzchni | Łatwa konserwacja neutralnymi środkami czyszczącymi | Pełny recykling na końcu okresu użytkowania	Środowisko i bezpieczeństwo	TEXT	4	f	2025-09-09 15:16:35.507	2025-09-09 15:16:35.507	9b4c1940-02c9-48f2-886f-db73ac6deb93	\N
0c184934-9f1d-47b4-a3c9-c47b8737b33e	Rozmiar: 600×600×9.5mm (±0.1%) | Materiał: Gres porcelanowy techniczny | Powierzchnia: Matowa | Tolerancja grubości: ±5% | Waga na m²: 22 kg | Wytrzymałość na zginanie: >1800N | Moduł pękania: >35 MPa | Nasiąkliwość wodą: ≤0.5% (EN ISO 10545-3) | Odporność na ścieranie: PEI IV (EN ISO 10545-7) | Antypoślizgowość: R10 (DIN 51130) | Mrozoodporność: 100+ cykle	Specyfikacje techniczne	TEXT	1	f	2025-09-09 15:16:35.516	2025-09-09 15:16:35.516	96c15ab2-a632-4eec-8712-789927b8f423	\N
fc103112-48ac-460d-992d-dd4328683ee9	Rozmiar: 600×600×9.5mm (±0.1%) | Materiał: Gres porcelanowy techniczny | Powierzchnia: Matowa | Tolerancja grubości: ±5% | Waga na m²: 22 kg | Wytrzymałość na zginanie: >1800N | Moduł pękania: >35 MPa | Nasiąkliwość wodą: ≤0.5% (EN ISO 10545-3) | Odporność na ścieranie: PEI IV (EN ISO 10545-7) | Antypoślizgowość: R10 (DIN 51130) | Mrozoodporność: 100+ cykle	Specyfikacje techniczne	TEXT	1	f	2025-09-09 15:16:35.561	2025-09-09 15:16:35.561	d34b9e37-a217-437b-aefd-c63554403f19	\N
5786cd90-0cde-459a-a19f-dc0ae3a2ab4f	Współczynnik rozszerzalności cieplnej: 7×10⁻⁶°C⁻¹ | Odporność chemiczna: Class A (EN ISO 10545-13) | Odporność na plamy: Class 5 (EN ISO 10545-14) | Klasa ogniowa: A1fl (EN 13501-1) | Odporność na głębokie ścieranie: ≤145 mm³ | Odchylenia wymiarowe: ±0,6% maks | Krawędzie rektyfikowane | Twardość Mohsa: 6-7	Właściwości fizyczno-chemiczne	TEXT	2	f	2025-09-09 15:16:35.568	2025-09-09 15:16:35.568	d34b9e37-a217-437b-aefd-c63554403f19	\N
31299f8f-09a8-4dd3-94d6-6439a007ff35	Zalecane do stref intensywnego ruchu komercyjnego. Kompatybilne z systemami ogrzewania podłogowego (maks 27°C). Montaż klejem klasy C2TE dla płytek wielkoformatowych. Szerokość fugi: 2-4mm. Można montować na ścianach z odpowiednim wsparciem. Nadaje się do basenów i stref mokrych	Montaż i zastosowanie	TEXT	3	f	2025-09-09 15:16:35.576	2025-09-09 15:16:35.576	d34b9e37-a217-437b-aefd-c63554403f19	\N
8ac98f7b-6cf2-404e-a2a6-c1d8a2cc0be1	Certyfikat GREENGUARD Gold dla jakości powietrza | Zawiera 20% materiałów z recyklingu | Niskie emisje VOC | Bez ołowiu i kadmu | Antymikrobowa obróbka powierzchni | Łatwa konserwacja neutralnymi środkami czyszczącymi | Pełny recykling na końcu okresu użytkowania	Środowisko i bezpieczeństwo	TEXT	4	f	2025-09-09 15:16:35.583	2025-09-09 15:16:35.583	d34b9e37-a217-437b-aefd-c63554403f19	\N
1352383f-aede-4adf-a523-e42a731d167d	Rozmiar: 600×600×9.5mm (±0.1%) | Materiał: Gres porcelanowy techniczny | Powierzchnia: Matowa | Tolerancja grubości: ±5% | Waga na m²: 22 kg | Wytrzymałość na zginanie: >1800N | Moduł pękania: >35 MPa | Nasiąkliwość wodą: ≤0.5% (EN ISO 10545-3) | Odporność na ścieranie: PEI IV (EN ISO 10545-7) | Antypoślizgowość: R10 (DIN 51130) | Mrozoodporność: 100+ cykle	Specyfikacje techniczne	TEXT	1	f	2025-09-09 15:16:35.59	2025-09-09 15:16:35.59	9176a99b-addc-40ac-a279-1c551f358446	\N
03a8386c-359e-4692-8392-f32aa3d82ffa	Współczynnik rozszerzalności cieplnej: 7×10⁻⁶°C⁻¹ | Odporność chemiczna: Class A (EN ISO 10545-13) | Odporność na plamy: Class 5 (EN ISO 10545-14) | Klasa ogniowa: A1fl (EN 13501-1) | Odporność na głębokie ścieranie: ≤145 mm³ | Odchylenia wymiarowe: ±0,6% maks | Krawędzie rektyfikowane | Twardość Mohsa: 6-7	Właściwości fizyczno-chemiczne	TEXT	2	f	2025-09-09 15:16:35.594	2025-09-09 15:16:35.594	9176a99b-addc-40ac-a279-1c551f358446	\N
30435b20-1d31-4c8e-af77-1c66f26c9f4a	Zalecane do stref intensywnego ruchu komercyjnego. Kompatybilne z systemami ogrzewania podłogowego (maks 27°C). Montaż klejem klasy C2TE dla płytek wielkoformatowych. Szerokość fugi: 2-4mm. Można montować na ścianach z odpowiednim wsparciem. Nadaje się do basenów i stref mokrych	Montaż i zastosowanie	TEXT	3	f	2025-09-09 15:16:35.6	2025-09-09 15:16:35.6	9176a99b-addc-40ac-a279-1c551f358446	\N
e44e8373-4e8c-4d1c-95ff-ff2bb62cc842	Współczynnik rozszerzalności cieplnej: 7×10⁻⁶°C⁻¹ | Odporność chemiczna: Class A (EN ISO 10545-13) | Odporność na plamy: Class 5 (EN ISO 10545-14) | Klasa ogniowa: A1fl (EN 13501-1) | Odporność na głębokie ścieranie: ≤145 mm³ | Odchylenia wymiarowe: ±0,6% maks | Krawędzie rektyfikowane | Twardość Mohsa: 6-7	Właściwości fizyczno-chemiczne	TEXT	2	f	2025-09-09 15:16:35.62	2025-09-09 15:16:35.62	691d9176-9b81-4402-8913-3d468a23641e	\N
2a364ce6-2463-41e4-ad48-73d4867405bb	Zalecane do stref intensywnego ruchu komercyjnego. Kompatybilne z systemami ogrzewania podłogowego (maks 27°C). Montaż klejem klasy C2TE dla płytek wielkoformatowych. Szerokość fugi: 2-4mm. Można montować na ścianach z odpowiednim wsparciem. Nadaje się do basenów i stref mokrych	Montaż i zastosowanie	TEXT	3	f	2025-09-09 15:16:35.625	2025-09-09 15:16:35.625	691d9176-9b81-4402-8913-3d468a23641e	\N
15d8baa8-3108-409a-a9bd-675949b15840	Certyfikat GREENGUARD Gold dla jakości powietrza | Zawiera 20% materiałów z recyklingu | Niskie emisje VOC | Bez ołowiu i kadmu | Antymikrobowa obróbka powierzchni | Łatwa konserwacja neutralnymi środkami czyszczącymi | Pełny recykling na końcu okresu użytkowania	Środowisko i bezpieczeństwo	TEXT	4	f	2025-09-09 15:16:35.632	2025-09-09 15:16:35.632	691d9176-9b81-4402-8913-3d468a23641e	\N
091ae5b3-86a9-4df2-b250-106f1de15129	Rozmiar: 595×595×9mm szary efekt kamienia (±0.1%) | Materiał: Gres porcelanowy techniczny | Powierzchnia: Matowa | Tolerancja grubości: ±5% | Waga na m²: 20 kg | Wytrzymałość na zginanie: >1800N | Moduł pękania: >35 MPa | Nasiąkliwość wodą: ≤0.5% (EN ISO 10545-3) | Odporność na ścieranie: PEI IV (EN ISO 10545-7) | Antypoślizgowość: R10 (DIN 51130) | Mrozoodporność: 100+ cykle	Specyfikacje techniczne	TEXT	1	f	2025-09-09 15:16:35.644	2025-09-09 15:16:35.644	e28659af-1167-48a4-9849-f9e368983828	\N
c2bc0701-2635-434d-adac-e1d9582ba231	Сертифікат GREENGUARD Gold для якості повітря | Містить 20% вторинних матеріалів | Низькі викиди ЛОС | Без свинцю та кадмію | Антимікробна обробка поверхні | Просте обслуговування нейтральними засобами | Повна переробка в кінці терміну служби	Екологія та безпека	TEXT	4	f	2025-09-09 15:16:35.792	2025-09-09 15:16:35.792	284edc0f-8db5-4d43-a5b5-05441d08418a	\N
3ded4843-9470-4eb2-9d75-61e26895602c	Współczynnik rozszerzalności cieplnej: 7×10⁻⁶°C⁻¹ | Odporność chemiczna: Class A (EN ISO 10545-13) | Odporność na plamy: Class 5 (EN ISO 10545-14) | Klasa ogniowa: A1fl (EN 13501-1) | Odporność na głębokie ścieranie: ≤145 mm³ | Odchylenia wymiarowe: ±0,6% maks | Krawędzie rektyfikowane | Twardość Mohsa: 6-7	Właściwości fizyczno-chemiczne	TEXT	2	f	2025-09-09 15:16:35.521	2025-09-09 15:16:35.521	96c15ab2-a632-4eec-8712-789927b8f423	\N
a999da0d-8056-4698-a2af-724b42cc2cbe	Zalecane do stref intensywnego ruchu komercyjnego. Kompatybilne z systemami ogrzewania podłogowego (maks 27°C). Montaż klejem klasy C2TE dla płytek wielkoformatowych. Szerokość fugi: 2-4mm. Można montować na ścianach z odpowiednim wsparciem. Nadaje się do basenów i stref mokrych	Montaż i zastosowanie	TEXT	3	f	2025-09-09 15:16:35.528	2025-09-09 15:16:35.528	96c15ab2-a632-4eec-8712-789927b8f423	\N
a41d9706-f04a-4459-9f3f-23a7486bf9cc	Certyfikat GREENGUARD Gold dla jakości powietrza | Zawiera 20% materiałów z recyklingu | Niskie emisje VOC | Bez ołowiu i kadmu | Antymikrobowa obróbka powierzchni | Łatwa konserwacja neutralnymi środkami czyszczącymi | Pełny recykling na końcu okresu użytkowania	Środowisko i bezpieczeństwo	TEXT	4	f	2025-09-09 15:16:35.543	2025-09-09 15:16:35.543	96c15ab2-a632-4eec-8712-789927b8f423	\N
d2914eb4-46a8-40f1-bf8f-438dbfee4cdf	Certyfikat GREENGUARD Gold dla jakości powietrza | Zawiera 20% materiałów z recyklingu | Niskie emisje VOC | Bez ołowiu i kadmu | Antymikrobowa obróbka powierzchni | Łatwa konserwacja neutralnymi środkami czyszczącymi | Pełny recykling na końcu okresu użytkowania	Środowisko i bezpieczeństwo	TEXT	4	f	2025-09-09 15:16:35.606	2025-09-09 15:16:35.606	9176a99b-addc-40ac-a279-1c551f358446	\N
c85ff243-b73e-4ed7-ab1c-41d5bf7c3fe4	Rozmiar: 607×607×9mm szary (±0.1%) | Materiał: Gres porcelanowy techniczny | Powierzchnia: Matowa | Tolerancja grubości: ±5% | Waga na m²: 21 kg | Wytrzymałość na zginanie: >1800N | Moduł pękania: >35 MPa | Nasiąkliwość wodą: ≤0.5% (EN ISO 10545-3) | Odporność na ścieranie: PEI IV (EN ISO 10545-7) | Antypoślizgowość: R10 (DIN 51130) | Mrozoodporność: 100+ cykle	Specyfikacje techniczne	TEXT	1	f	2025-09-09 15:16:35.615	2025-09-09 15:16:35.615	691d9176-9b81-4402-8913-3d468a23641e	\N
2f7604fe-4b2f-43e4-b8a7-6d423b2008f0	Współczynnik rozszerzalności cieplnej: 7×10⁻⁶°C⁻¹ | Odporność chemiczna: Class A (EN ISO 10545-13) | Odporność na plamy: Class 5 (EN ISO 10545-14) | Klasa ogniowa: A1fl (EN 13501-1) | Odporność na głębokie ścieranie: ≤145 mm³ | Odchylenia wymiarowe: ±0,6% maks | Krawędzie rektyfikowane | Twardość Mohsa: 6-7	Właściwości fizyczno-chemiczne	TEXT	2	f	2025-09-09 15:16:35.649	2025-09-09 15:16:35.649	e28659af-1167-48a4-9849-f9e368983828	\N
ef0f35af-16cb-4a54-a20a-e584f99e8a28	Zalecane do stref intensywnego ruchu komercyjnego. Kompatybilne z systemami ogrzewania podłogowego (maks 27°C). Montaż klejem klasy C2TE dla płytek wielkoformatowych. Szerokość fugi: 2-4mm. Można montować na ścianach z odpowiednim wsparciem. Nadaje się do basenów i stref mokrych	Montaż i zastosowanie	TEXT	3	f	2025-09-09 15:16:35.654	2025-09-09 15:16:35.654	e28659af-1167-48a4-9849-f9e368983828	\N
439cb79c-c28e-4ee7-a196-a3831b096a05	Certyfikat GREENGUARD Gold dla jakości powietrza | Zawiera 20% materiałów z recyklingu | Niskie emisje VOC | Bez ołowiu i kadmu | Antymikrobowa obróbka powierzchni | Łatwa konserwacja neutralnymi środkami czyszczącymi | Pełny recykling na końcu okresu użytkowania	Środowisko i bezpieczeństwo	TEXT	4	f	2025-09-09 15:16:35.66	2025-09-09 15:16:35.66	e28659af-1167-48a4-9849-f9e368983828	\N
a0faab65-730e-4bf7-a6fb-04a2237efbc4	Rozmiar: 595×595×9mm czarny efekt kamienia (±0.1%) | Materiał: Gres porcelanowy techniczny | Powierzchnia: Matowa | Tolerancja grubości: ±5% | Waga na m²: 20 kg | Wytrzymałość na zginanie: >1800N | Moduł pękania: >35 MPa | Nasiąkliwość wodą: ≤0.5% (EN ISO 10545-3) | Odporność na ścieranie: PEI IV (EN ISO 10545-7) | Antypoślizgowość: R10 (DIN 51130) | Mrozoodporność: 100+ cykle	Specyfikacje techniczne	TEXT	1	f	2025-09-09 15:16:35.681	2025-09-09 15:16:35.681	ce7c4fed-4589-4edd-8fb2-ceae30495279	\N
2860cdbe-ea61-4072-84db-5126aadae968	Współczynnik rozszerzalności cieplnej: 7×10⁻⁶°C⁻¹ | Odporność chemiczna: Class A (EN ISO 10545-13) | Odporność na plamy: Class 5 (EN ISO 10545-14) | Klasa ogniowa: A1fl (EN 13501-1) | Odporność na głębokie ścieranie: ≤145 mm³ | Odchylenia wymiarowe: ±0,6% maks | Krawędzie rektyfikowane | Twardość Mohsa: 6-7	Właściwości fizyczno-chemiczne	TEXT	2	f	2025-09-09 15:16:35.691	2025-09-09 15:16:35.691	ce7c4fed-4589-4edd-8fb2-ceae30495279	\N
e78ddf45-812a-4eec-8d1f-90b06ac1ecdf	Zalecane do stref intensywnego ruchu komercyjnego. Kompatybilne z systemami ogrzewania podłogowego (maks 27°C). Montaż klejem klasy C2TE dla płytek wielkoformatowych. Szerokość fugi: 2-4mm. Można montować na ścianach z odpowiednim wsparciem. Nadaje się do basenów i stref mokrych	Montaż i zastosowanie	TEXT	3	f	2025-09-09 15:16:35.706	2025-09-09 15:16:35.706	ce7c4fed-4589-4edd-8fb2-ceae30495279	\N
0f55f137-f890-4f80-a8c9-66237a16faac	Certyfikat GREENGUARD Gold dla jakości powietrza | Zawiera 20% materiałów z recyklingu | Niskie emisje VOC | Bez ołowiu i kadmu | Antymikrobowa obróbka powierzchni | Łatwa konserwacja neutralnymi środkami czyszczącymi | Pełny recykling na końcu okresu użytkowania	Środowisko i bezpieczeństwo	TEXT	4	f	2025-09-09 15:16:35.721	2025-09-09 15:16:35.721	ce7c4fed-4589-4edd-8fb2-ceae30495279	\N
15158499-137d-44cf-9229-eb59ef452dc9	Rozmiar: 595×595×9mm matowy/gładki (±0.1%) | Materiał: Gres porcelanowy techniczny | Powierzchnia: Matowa | Tolerancja grubości: ±5% | Waga na m²: 20 kg | Wytrzymałość na zginanie: >1800N | Moduł pękania: >35 MPa | Nasiąkliwość wodą: ≤0.5% (EN ISO 10545-3) | Odporność na ścieranie: PEI IV (EN ISO 10545-7) | Antypoślizgowość: R10 (DIN 51130) | Mrozoodporność: 100+ cykle	Specyfikacje techniczne	TEXT	1	f	2025-09-09 15:16:35.73	2025-09-09 15:16:35.73	3f382861-1cae-4eff-920f-ee6b9327fb6d	\N
8d3281b9-9942-4908-b1fd-71df64aa6de1	Współczynnik rozszerzalności cieplnej: 7×10⁻⁶°C⁻¹ | Odporność chemiczna: Class A (EN ISO 10545-13) | Odporność na plamy: Class 5 (EN ISO 10545-14) | Klasa ogniowa: A1fl (EN 13501-1) | Odporność na głębokie ścieranie: ≤145 mm³ | Odchylenia wymiarowe: ±0,6% maks | Krawędzie rektyfikowane | Twardość Mohsa: 6-7	Właściwości fizyczno-chemiczne	TEXT	2	f	2025-09-09 15:16:35.736	2025-09-09 15:16:35.736	3f382861-1cae-4eff-920f-ee6b9327fb6d	\N
2d85093e-c0c9-48ec-9990-0eb6baddc8d1	Zalecane do stref intensywnego ruchu komercyjnego. Kompatybilne z systemami ogrzewania podłogowego (maks 27°C). Montaż klejem klasy C2TE dla płytek wielkoformatowych. Szerokość fugi: 2-4mm. Można montować na ścianach z odpowiednim wsparciem. Nadaje się do basenów i stref mokrych	Montaż i zastosowanie	TEXT	3	f	2025-09-09 15:16:35.744	2025-09-09 15:16:35.744	3f382861-1cae-4eff-920f-ee6b9327fb6d	\N
73d6b682-1e10-4b08-92dc-0b5098c240d1	Certyfikat GREENGUARD Gold dla jakości powietrza | Zawiera 20% materiałów z recyklingu | Niskie emisje VOC | Bez ołowiu i kadmu | Antymikrobowa obróbka powierzchni | Łatwa konserwacja neutralnymi środkami czyszczącymi | Pełny recykling na końcu okresu użytkowania	Środowisko i bezpieczeństwo	TEXT	4	f	2025-09-09 15:16:35.75	2025-09-09 15:16:35.75	3f382861-1cae-4eff-920f-ee6b9327fb6d	\N
18edbbe1-fe77-46de-a702-3ce19c4c6b1c	Розмір: 600×600×9.5mm бежевий (±0.1%) | Матеріал: Технічний керамограніт | Поверхня: Матова | Відхилення товщини: ±5% | Вага на м²: 22 кг | Розривне навантаження: >1800N | Межа міцності на вигин: >35 MPa | Водопоглинання: ≤0.5% (EN ISO 10545-3) | Зносостійкість: PEI IV (EN ISO 10545-7) | Протиковзання: R10 (DIN 51130) | Морозостійкість: 100+ циклів	Технічні характеристики	TEXT	1	f	2025-09-09 15:16:35.77	2025-09-09 15:16:35.77	284edc0f-8db5-4d43-a5b5-05441d08418a	\N
1aa66f9d-7d26-452d-a5a9-7f8319bc82b9	Коефіцієнт теплового розширення: 7×10⁻⁶°C⁻¹ | Хімічна стійкість: Class A (EN ISO 10545-13) | Стійкість до плям: Class 5 (EN ISO 10545-14) | Вогнетривкий рейтинг: A1fl (EN 13501-1) | Стійкість до глибокого стирання: ≤145 mm³ | Розмірні відхилення: ±0,6% макс | Ректифіковані краї | Твердість за Мооса: 6-7	Фізико-хімічні властивості	TEXT	2	f	2025-09-09 15:16:35.78	2025-09-09 15:16:35.78	284edc0f-8db5-4d43-a5b5-05441d08418a	\N
eece3b59-0f84-462e-9aee-5b1f14deae08	Рекомендується для зон інтенсивного комерційного трафіку. Сумісний з системами теплої підлоги (макс 27°C). Укладання клеєм класу C2TE для великоформатної плитки. Ширина шва: 2-4мм. Можлива укладання на стіни з належною підтримкою. Підходить для басейнів і вологих зон	Укладання та застосування	TEXT	3	f	2025-09-09 15:16:35.788	2025-09-09 15:16:35.788	284edc0f-8db5-4d43-a5b5-05441d08418a	\N
10f964a4-3b99-4773-8f31-efc4e524582d	Коефіцієнт теплового розширення: 7×10⁻⁶°C⁻¹ | Хімічна стійкість: Class A (EN ISO 10545-13) | Стійкість до плям: Class 5 (EN ISO 10545-14) | Вогнетривкий рейтинг: A1fl (EN 13501-1) | Стійкість до глибокого стирання: ≤145 mm³ | Розмірні відхилення: ±0,6% макс | Ректифіковані краї | Твердість за Мооса: 6-7	Фізико-хімічні властивості	TEXT	2	f	2025-09-09 15:16:35.831	2025-09-09 15:16:35.831	3eb2db13-16e8-4b7b-a2c9-19c223d9772e	\N
e0a9e8f9-b55d-4247-9c6d-edf0a0e43d3d	Рекомендується для зон інтенсивного комерційного трафіку. Сумісний з системами теплої підлоги (макс 27°C). Укладання клеєм класу C2TE для великоформатної плитки. Ширина шва: 2-4мм. Можлива укладання на стіни з належною підтримкою. Підходить для басейнів і вологих зон	Укладання та застосування	TEXT	3	f	2025-09-09 15:16:35.837	2025-09-09 15:16:35.837	3eb2db13-16e8-4b7b-a2c9-19c223d9772e	\N
82775e9b-7b1f-42de-af72-8d0bf956436b	Сертифікат GREENGUARD Gold для якості повітря | Містить 20% вторинних матеріалів | Низькі викиди ЛОС | Без свинцю та кадмію | Антимікробна обробка поверхні | Просте обслуговування нейтральними засобами | Повна переробка в кінці терміну служби	Екологія та безпека	TEXT	4	f	2025-09-09 15:16:35.841	2025-09-09 15:16:35.841	3eb2db13-16e8-4b7b-a2c9-19c223d9772e	\N
d8b8c9c1-b5a7-4855-935b-d1e3256cfc7f	Розмір: 600×600×9.5mm сірий (±0.1%) | Матеріал: Технічний керамограніт | Поверхня: Матова | Відхилення товщини: ±5% | Вага на м²: 22 кг | Розривне навантаження: >1800N | Межа міцності на вигин: >35 MPa | Водопоглинання: ≤0.5% (EN ISO 10545-3) | Зносостійкість: PEI IV (EN ISO 10545-7) | Протиковзання: R10 (DIN 51130) | Морозостійкість: 100+ циклів	Технічні характеристики	TEXT	1	f	2025-09-09 15:16:35.849	2025-09-09 15:16:35.849	f98f8c69-827b-4ac0-9a6a-a2a67eddacbe	\N
1abb663c-629b-40ce-a659-14441759f3a4	Коефіцієнт теплового розширення: 7×10⁻⁶°C⁻¹ | Хімічна стійкість: Class A (EN ISO 10545-13) | Стійкість до плям: Class 5 (EN ISO 10545-14) | Вогнетривкий рейтинг: A1fl (EN 13501-1) | Стійкість до глибокого стирання: ≤145 mm³ | Розмірні відхилення: ±0,6% макс | Ректифіковані краї | Твердість за Мооса: 6-7	Фізико-хімічні властивості	TEXT	2	f	2025-09-09 15:16:35.852	2025-09-09 15:16:35.852	f98f8c69-827b-4ac0-9a6a-a2a67eddacbe	\N
69f74493-89b7-4e90-99c5-0108690c9fa6	Рекомендується для зон інтенсивного комерційного трафіку. Сумісний з системами теплої підлоги (макс 27°C). Укладання клеєм класу C2TE для великоформатної плитки. Ширина шва: 2-4мм. Можлива укладання на стіни з належною підтримкою. Підходить для басейнів і вологих зон	Укладання та застосування	TEXT	3	f	2025-09-09 15:16:35.86	2025-09-09 15:16:35.86	f98f8c69-827b-4ac0-9a6a-a2a67eddacbe	\N
14d374bb-76f6-45b9-bf5e-f3375f046069	Сертифікат GREENGUARD Gold для якості повітря | Містить 20% вторинних матеріалів | Низькі викиди ЛОС | Без свинцю та кадмію | Антимікробна обробка поверхні | Просте обслуговування нейтральними засобами | Повна переробка в кінці терміну служби	Екологія та безпека	TEXT	4	f	2025-09-09 15:16:35.865	2025-09-09 15:16:35.865	f98f8c69-827b-4ac0-9a6a-a2a67eddacbe	\N
ef03bd1c-ddd9-47b9-b8e3-9fe5e28228d1	Розмір: 600×600×9.5mm (±0.1%) | Матеріал: Технічний керамограніт | Поверхня: Матова | Відхилення товщини: ±5% | Вага на м²: 22 кг | Розривне навантаження: >1800N | Межа міцності на вигин: >35 MPa | Водопоглинання: ≤0.5% (EN ISO 10545-3) | Зносостійкість: PEI IV (EN ISO 10545-7) | Протиковзання: R10 (DIN 51130) | Морозостійкість: 100+ циклів	Технічні характеристики	TEXT	1	f	2025-09-09 15:16:35.904	2025-09-09 15:16:35.904	540eea62-0f38-4e1e-93cc-06db53fd3a67	\N
e8b08c74-a155-47f1-b9be-3cb85144abec	GREENGUARD Gold certified for indoor air quality | Contains 20% recycled materials | Low VOC emissions | Lead and cadmium free | Antimicrobial surface treatment | Easy maintenance with standard pH neutral cleaners | Recyclable at end of life	Environmental & Safety	TEXT	4	f	2025-09-09 15:16:36.663	2025-09-09 15:16:36.663	86c23faf-cbd5-47a5-8ba6-4eb3d17b81f3	\N
f50cc178-f179-4b33-84d8-8d69c0ddcde2	Розмір: 600×600×9,5мм (±0,1%) | Матеріал: Технічний керамограніт | Поверхня: Матова | Відхилення товщини: ±5% | Вага на м²: 22 кг | Розривне навантаження: >1800Н | Межа міцності на вигин: >35 МПа | Водопоглинання: ≤0,5% (EN ISO 10545-3) | Зносостійкість: PEI IV (EN ISO 10545-7) | Протиковзання: R10 (DIN 51130) | Морозостійкість: 100+ циклів	Технічні характеристики	TEXT	1	f	2025-09-09 15:16:35.8	2025-09-09 15:16:35.8	59d2d6eb-457a-4492-aef1-aec6aae5fdb6	\N
b7936aa2-4910-41d8-b5f7-4eb9062d3a3d	Коефіцієнт теплового розширення: 7×10⁻⁶°C⁻¹ | Хімічна стійкість: Клас А (EN ISO 10545-13) | Стійкість до плям: Клас 5 (EN ISO 10545-14) | Вогнетривкий рейтинг: A1fl (EN 13501-1) | Стійкість до глибокого стирання: ≤145 мм³ | Розмірні відхилення: ±0,6% макс | Ректифіковані краї | Твердість за Мооса: 6-7	Фізико-хімічні властивості	TEXT	2	f	2025-09-09 15:16:35.808	2025-09-09 15:16:35.808	59d2d6eb-457a-4492-aef1-aec6aae5fdb6	\N
8011fe87-7c0d-4dae-85cf-31fe35d83911	Рекомендується для зон інтенсивного комерційного трафіку. Сумісний з системами теплої підлоги (макс 27°C). Укладання клеєм класу C2TE для великоформатної плитки. Ширина шва: 2-4мм. Можлива укладання на стіни з належною підтримкою. Підходить для басейнів і вологих зон	Укладання та застосування	TEXT	3	f	2025-09-09 15:16:35.813	2025-09-09 15:16:35.813	59d2d6eb-457a-4492-aef1-aec6aae5fdb6	\N
f4f83b0a-f598-4374-a64d-83c2aceaab33	Сертифікат GREENGUARD Gold для якості повітря | Містить 20% вторинних матеріалів | Низькі викиди ЛОС | Без свинцю та кадмію | Антимікробна обробка поверхні | Просте обслуговування нейтральними засобами | Повна переробка в кінці терміну служби	Екологія та безпека	TEXT	4	f	2025-09-09 15:16:35.818	2025-09-09 15:16:35.818	59d2d6eb-457a-4492-aef1-aec6aae5fdb6	\N
5609095e-c0cc-409e-bcc6-39757a2342b7	Розмір: 600×600×9.5mm бежевий (±0.1%) | Матеріал: Технічний керамограніт | Поверхня: Матова | Відхилення товщини: ±5% | Вага на м²: 22 кг | Розривне навантаження: >1800N | Межа міцності на вигин: >35 MPa | Водопоглинання: ≤0.5% (EN ISO 10545-3) | Зносостійкість: PEI IV (EN ISO 10545-7) | Протиковзання: R10 (DIN 51130) | Морозостійкість: 100+ циклів	Технічні характеристики	TEXT	1	f	2025-09-09 15:16:35.826	2025-09-09 15:16:35.826	3eb2db13-16e8-4b7b-a2c9-19c223d9772e	\N
3809842d-8d65-4270-bc58-69325e605f06	Коефіцієнт теплового розширення: 7×10⁻⁶°C⁻¹ | Хімічна стійкість: Class A (EN ISO 10545-13) | Стійкість до плям: Class 5 (EN ISO 10545-14) | Вогнетривкий рейтинг: A1fl (EN 13501-1) | Стійкість до глибокого стирання: ≤145 mm³ | Розмірні відхилення: ±0,6% макс | Ректифіковані краї | Твердість за Мооса: 6-7	Фізико-хімічні властивості	TEXT	2	f	2025-09-09 15:16:35.942	2025-09-09 15:16:35.942	f384ab2a-2462-4a4e-b4fc-c1f8e0a39759	\N
075db2b0-81cd-454e-8cfe-9a7082e7bfe5	Рекомендується для зон інтенсивного комерційного трафіку. Сумісний з системами теплої підлоги (макс 27°C). Укладання клеєм класу C2TE для великоформатної плитки. Ширина шва: 2-4мм. Можлива укладання на стіни з належною підтримкою. Підходить для басейнів і вологих зон	Укладання та застосування	TEXT	3	f	2025-09-09 15:16:35.953	2025-09-09 15:16:35.953	f384ab2a-2462-4a4e-b4fc-c1f8e0a39759	\N
e37e9624-809c-4fb0-bdd3-c7fe7bdf9de3	Сертифікат GREENGUARD Gold для якості повітря | Містить 20% вторинних матеріалів | Низькі викиди ЛОС | Без свинцю та кадмію | Антимікробна обробка поверхні | Просте обслуговування нейтральними засобами | Повна переробка в кінці терміну служби	Екологія та безпека	TEXT	4	f	2025-09-09 15:16:35.972	2025-09-09 15:16:35.972	f384ab2a-2462-4a4e-b4fc-c1f8e0a39759	\N
b6b30b30-ad30-404f-9c60-06135e417b98	Розмір: 600×600×9.5mm (±0.1%) | Матеріал: Технічний керамограніт | Поверхня: Матова | Відхилення товщини: ±5% | Вага на м²: 22 кг | Розривне навантаження: >1800N | Межа міцності на вигин: >35 MPa | Водопоглинання: ≤0.5% (EN ISO 10545-3) | Зносостійкість: PEI IV (EN ISO 10545-7) | Протиковзання: R10 (DIN 51130) | Морозостійкість: 100+ циклів	Технічні характеристики	TEXT	1	f	2025-09-09 15:16:35.997	2025-09-09 15:16:35.997	2b1a34bf-01d1-4a1c-82a0-d7806a44389f	\N
8c71782a-a8c8-4fac-885e-615947eaa004	Коефіцієнт теплового розширення: 7×10⁻⁶°C⁻¹ | Хімічна стійкість: Class A (EN ISO 10545-13) | Стійкість до плям: Class 5 (EN ISO 10545-14) | Вогнетривкий рейтинг: A1fl (EN 13501-1) | Стійкість до глибокого стирання: ≤145 mm³ | Розмірні відхилення: ±0,6% макс | Ректифіковані краї | Твердість за Мооса: 6-7	Фізико-хімічні властивості	TEXT	2	f	2025-09-09 15:16:36.011	2025-09-09 15:16:36.011	2b1a34bf-01d1-4a1c-82a0-d7806a44389f	\N
4c477d95-edb2-4819-ab3b-b5b9f12a01be	Рекомендується для зон інтенсивного комерційного трафіку. Сумісний з системами теплої підлоги (макс 27°C). Укладання клеєм класу C2TE для великоформатної плитки. Ширина шва: 2-4мм. Можлива укладання на стіни з належною підтримкою. Підходить для басейнів і вологих зон	Укладання та застосування	TEXT	3	f	2025-09-09 15:16:36.024	2025-09-09 15:16:36.024	2b1a34bf-01d1-4a1c-82a0-d7806a44389f	\N
77f85b18-2708-4487-8f13-33344659da2e	Коефіцієнт теплового розширення: 7×10⁻⁶°C⁻¹ | Хімічна стійкість: Class A (EN ISO 10545-13) | Стійкість до плям: Class 5 (EN ISO 10545-14) | Вогнетривкий рейтинг: A1fl (EN 13501-1) | Стійкість до глибокого стирання: ≤145 mm³ | Розмірні відхилення: ±0,6% макс | Ректифіковані краї | Твердість за Мооса: 6-7	Фізико-хімічні властивості	TEXT	2	f	2025-09-09 15:16:35.912	2025-09-09 15:16:35.912	540eea62-0f38-4e1e-93cc-06db53fd3a67	\N
e0267f60-cc52-4f76-9942-e66ce75a3553	Рекомендується для зон інтенсивного комерційного трафіку. Сумісний з системами теплої підлоги (макс 27°C). Укладання клеєм класу C2TE для великоформатної плитки. Ширина шва: 2-4мм. Можлива укладання на стіни з належною підтримкою. Підходить для басейнів і вологих зон	Укладання та застосування	TEXT	3	f	2025-09-09 15:16:35.92	2025-09-09 15:16:35.92	540eea62-0f38-4e1e-93cc-06db53fd3a67	\N
570d88a4-2c65-49e3-b814-85433c84d585	Сертифікат GREENGUARD Gold для якості повітря | Містить 20% вторинних матеріалів | Низькі викиди ЛОС | Без свинцю та кадмію | Антимікробна обробка поверхні | Просте обслуговування нейтральними засобами | Повна переробка в кінці терміну служби	Екологія та безпека	TEXT	4	f	2025-09-09 15:16:35.925	2025-09-09 15:16:35.925	540eea62-0f38-4e1e-93cc-06db53fd3a67	\N
54e1156e-18cb-4a31-b95d-65a7080905c4	Розмір: 600×600×9.5mm (±0.1%) | Матеріал: Технічний керамограніт | Поверхня: Матова | Відхилення товщини: ±5% | Вага на м²: 22 кг | Розривне навантаження: >1800N | Межа міцності на вигин: >35 MPa | Водопоглинання: ≤0.5% (EN ISO 10545-3) | Зносостійкість: PEI IV (EN ISO 10545-7) | Протиковзання: R10 (DIN 51130) | Морозостійкість: 100+ циклів	Технічні характеристики	TEXT	1	f	2025-09-09 15:16:35.937	2025-09-09 15:16:35.937	f384ab2a-2462-4a4e-b4fc-c1f8e0a39759	\N
75577ed1-debb-497c-8e64-6e109388f4bb	Розмір: 595×595×9mm чорний під камінь (±0.1%) | Матеріал: Технічний керамограніт | Поверхня: Матова | Відхилення товщини: ±5% | Вага на м²: 20 кг | Розривне навантаження: >1800N | Межа міцності на вигин: >35 MPa | Водопоглинання: ≤0.5% (EN ISO 10545-3) | Зносостійкість: PEI IV (EN ISO 10545-7) | Протиковзання: R10 (DIN 51130) | Морозостійкість: 100+ циклів	Технічні характеристики	TEXT	1	f	2025-09-09 15:16:36.157	2025-09-09 15:16:36.157	9809b8f7-cd00-4b4e-b8ae-f392a3ea7f8c	\N
32c60e96-c6b2-41c8-be8c-e246ac9b9f41	Коефіцієнт теплового розширення: 7×10⁻⁶°C⁻¹ | Хімічна стійкість: Class A (EN ISO 10545-13) | Стійкість до плям: Class 5 (EN ISO 10545-14) | Вогнетривкий рейтинг: A1fl (EN 13501-1) | Стійкість до глибокого стирання: ≤145 mm³ | Розмірні відхилення: ±0,6% макс | Ректифіковані краї | Твердість за Мооса: 6-7	Фізико-хімічні властивості	TEXT	2	f	2025-09-09 15:16:36.162	2025-09-09 15:16:36.162	9809b8f7-cd00-4b4e-b8ae-f392a3ea7f8c	\N
500319d0-89be-4228-952b-5dfdbb54b3df	Рекомендується для зон інтенсивного комерційного трафіку. Сумісний з системами теплої підлоги (макс 27°C). Укладання клеєм класу C2TE для великоформатної плитки. Ширина шва: 2-4мм. Можлива укладання на стіни з належною підтримкою. Підходить для басейнів і вологих зон	Укладання та застосування	TEXT	3	f	2025-09-09 15:16:36.175	2025-09-09 15:16:36.175	9809b8f7-cd00-4b4e-b8ae-f392a3ea7f8c	\N
504cea7b-3e60-43f6-9255-aa9c117bfa5f	Сертифікат GREENGUARD Gold для якості повітря | Містить 20% вторинних матеріалів | Низькі викиди ЛОС | Без свинцю та кадмію | Антимікробна обробка поверхні | Просте обслуговування нейтральними засобами | Повна переробка в кінці терміну служби	Екологія та безпека	TEXT	4	f	2025-09-09 15:16:36.189	2025-09-09 15:16:36.189	9809b8f7-cd00-4b4e-b8ae-f392a3ea7f8c	\N
7e56efe0-e564-4fa5-a941-fc35ff935e1a	Розмір: 595×595×9mm матовий/глянцевий (±0.1%) | Матеріал: Технічний керамограніт | Поверхня: Матова | Відхилення товщини: ±5% | Вага на м²: 20 кг | Розривне навантаження: >1800N | Межа міцності на вигин: >35 MPa | Водопоглинання: ≤0.5% (EN ISO 10545-3) | Зносостійкість: PEI IV (EN ISO 10545-7) | Протиковзання: R10 (DIN 51130) | Морозостійкість: 100+ циклів	Технічні характеристики	TEXT	1	f	2025-09-09 15:16:36.202	2025-09-09 15:16:36.202	10aa3969-c8a7-4216-bc40-1b90ce706b87	\N
2fbbaa0a-bc1b-4b5e-9736-05184c5a5b56	Коефіцієнт теплового розширення: 7×10⁻⁶°C⁻¹ | Хімічна стійкість: Class A (EN ISO 10545-13) | Стійкість до плям: Class 5 (EN ISO 10545-14) | Вогнетривкий рейтинг: A1fl (EN 13501-1) | Стійкість до глибокого стирання: ≤145 mm³ | Розмірні відхилення: ±0,6% макс | Ректифіковані краї | Твердість за Мооса: 6-7	Фізико-хімічні властивості	TEXT	2	f	2025-09-09 15:16:36.221	2025-09-09 15:16:36.221	10aa3969-c8a7-4216-bc40-1b90ce706b87	\N
e72540fd-e98b-4798-96a5-366d20cfc780	Рекомендується для зон інтенсивного комерційного трафіку. Сумісний з системами теплої підлоги (макс 27°C). Укладання клеєм класу C2TE для великоформатної плитки. Ширина шва: 2-4мм. Можлива укладання на стіни з належною підтримкою. Підходить для басейнів і вологих зон	Укладання та застосування	TEXT	3	f	2025-09-09 15:16:36.232	2025-09-09 15:16:36.232	10aa3969-c8a7-4216-bc40-1b90ce706b87	\N
6f612d77-23d4-40c1-8266-bec1ac9a9bba	Сертифікат GREENGUARD Gold для якості повітря | Містить 20% вторинних матеріалів | Низькі викиди ЛОС | Без свинцю та кадмію | Антимікробна обробка поверхні | Просте обслуговування нейтральними засобами | Повна переробка в кінці терміну служби	Екологія та безпека	TEXT	4	f	2025-09-09 15:16:36.031	2025-09-09 15:16:36.031	2b1a34bf-01d1-4a1c-82a0-d7806a44389f	\N
f1271ef3-62ed-4ac1-a930-7e7c2a21ca85	Розмір: 607×607×9mm сірий (±0.1%) | Матеріал: Технічний керамограніт | Поверхня: Матова | Відхилення товщини: ±5% | Вага на м²: 21 кг | Розривне навантаження: >1800N | Межа міцності на вигин: >35 MPa | Водопоглинання: ≤0.5% (EN ISO 10545-3) | Зносостійкість: PEI IV (EN ISO 10545-7) | Протиковзання: R10 (DIN 51130) | Морозостійкість: 100+ циклів	Технічні характеристики	TEXT	1	f	2025-09-09 15:16:36.051	2025-09-09 15:16:36.051	4a554b06-ce4e-4466-9d10-ed0ed2d4b3d3	\N
1b9048cc-4678-4a69-a65b-e1a38e4c94a5	Коефіцієнт теплового розширення: 7×10⁻⁶°C⁻¹ | Хімічна стійкість: Class A (EN ISO 10545-13) | Стійкість до плям: Class 5 (EN ISO 10545-14) | Вогнетривкий рейтинг: A1fl (EN 13501-1) | Стійкість до глибокого стирання: ≤145 mm³ | Розмірні відхилення: ±0,6% макс | Ректифіковані краї | Твердість за Мооса: 6-7	Фізико-хімічні властивості	TEXT	2	f	2025-09-09 15:16:36.064	2025-09-09 15:16:36.064	4a554b06-ce4e-4466-9d10-ed0ed2d4b3d3	\N
3538bb96-fb1b-403c-a620-1ecc42bd9762	Рекомендується для зон інтенсивного комерційного трафіку. Сумісний з системами теплої підлоги (макс 27°C). Укладання клеєм класу C2TE для великоформатної плитки. Ширина шва: 2-4мм. Можлива укладання на стіни з належною підтримкою. Підходить для басейнів і вологих зон	Укладання та застосування	TEXT	3	f	2025-09-09 15:16:36.081	2025-09-09 15:16:36.081	4a554b06-ce4e-4466-9d10-ed0ed2d4b3d3	\N
f51f6b47-48a2-4f64-acc5-bcae78c1d1a9	Сертифікат GREENGUARD Gold для якості повітря | Містить 20% вторинних матеріалів | Низькі викиди ЛОС | Без свинцю та кадмію | Антимікробна обробка поверхні | Просте обслуговування нейтральними засобами | Повна переробка в кінці терміну служби	Екологія та безпека	TEXT	4	f	2025-09-09 15:16:36.094	2025-09-09 15:16:36.094	4a554b06-ce4e-4466-9d10-ed0ed2d4b3d3	\N
6bc48c27-d232-42d2-b632-12c729b172e9	Розмір: 595×595×9mm сірий під камінь (±0.1%) | Матеріал: Технічний керамограніт | Поверхня: Матова | Відхилення товщини: ±5% | Вага на м²: 20 кг | Розривне навантаження: >1800N | Межа міцності на вигин: >35 MPa | Водопоглинання: ≤0.5% (EN ISO 10545-3) | Зносостійкість: PEI IV (EN ISO 10545-7) | Протиковзання: R10 (DIN 51130) | Морозостійкість: 100+ циклів	Технічні характеристики	TEXT	1	f	2025-09-09 15:16:36.117	2025-09-09 15:16:36.117	77be5b1e-270b-496a-a439-87c31a9f5f6a	\N
7e2d77cc-67a6-40f3-9b61-382f002d2574	Коефіцієнт теплового розширення: 7×10⁻⁶°C⁻¹ | Хімічна стійкість: Class A (EN ISO 10545-13) | Стійкість до плям: Class 5 (EN ISO 10545-14) | Вогнетривкий рейтинг: A1fl (EN 13501-1) | Стійкість до глибокого стирання: ≤145 mm³ | Розмірні відхилення: ±0,6% макс | Ректифіковані краї | Твердість за Мооса: 6-7	Фізико-хімічні властивості	TEXT	2	f	2025-09-09 15:16:36.124	2025-09-09 15:16:36.124	77be5b1e-270b-496a-a439-87c31a9f5f6a	\N
03ba52d6-d30b-443b-b7e8-520d3a2cdc62	Рекомендується для зон інтенсивного комерційного трафіку. Сумісний з системами теплої підлоги (макс 27°C). Укладання клеєм класу C2TE для великоформатної плитки. Ширина шва: 2-4мм. Можлива укладання на стіни з належною підтримкою. Підходить для басейнів і вологих зон	Укладання та застосування	TEXT	3	f	2025-09-09 15:16:36.132	2025-09-09 15:16:36.132	77be5b1e-270b-496a-a439-87c31a9f5f6a	\N
40d15f1e-611f-49ce-95a0-c54689fadc9f	Сертифікат GREENGUARD Gold для якості повітря | Містить 20% вторинних матеріалів | Низькі викиди ЛОС | Без свинцю та кадмію | Антимікробна обробка поверхні | Просте обслуговування нейтральними засобами | Повна переробка в кінці терміну служби	Екологія та безпека	TEXT	4	f	2025-09-09 15:16:36.144	2025-09-09 15:16:36.144	77be5b1e-270b-496a-a439-87c31a9f5f6a	\N
fcf2e994-ea2a-4635-8493-c06e6c410ffb	Коэффициент теплового расширения: 7×10⁻⁶°C⁻¹ | Химическая стойкость: Class A (EN ISO 10545-13) | Стойкость к пятнам: Class 5 (EN ISO 10545-14) | Пожарный рейтинг: A1fl (EN 13501-1) | Стойкость к глубокому истиранию: ≤145 mm³ | Размерные отклонения: ±0,6% макс | Ректифицированные края | Твердость по Моосу: 6-7	Физико-химические свойства	TEXT	2	f	2025-09-09 15:16:36.271	2025-09-09 15:16:36.271	f48394d3-8189-4501-b9e4-9e332f7d87a2	\N
54aba8b6-353d-473a-b3d7-270def7dc3f4	Рекомендуется для зон интенсивного коммерческого трафика. Совместим с системами теплого пола (макс 27°C). Укладка клеем класса C2TE для крупноформатной плитки. Ширина шва: 2-4мм. Возможна укладка на стены с надлежащей поддержкой. Подходит для бассейнов и влажных зон	Укладка и применение	TEXT	3	f	2025-09-09 15:16:36.278	2025-09-09 15:16:36.278	f48394d3-8189-4501-b9e4-9e332f7d87a2	\N
d0664d38-095d-4cf6-9564-ba51483d86df	Сертификат GREENGUARD Gold для качества воздуха | Содержит 20% вторичных материалов | Низкие выбросы ЛОС | Без свинца и кадмия | Антимикробная обработка поверхности | Простое обслуживание нейтральными чистящими средствами | Полная переработка в конце срока службы	Экология и безопасность	TEXT	4	f	2025-09-09 15:16:36.284	2025-09-09 15:16:36.284	f48394d3-8189-4501-b9e4-9e332f7d87a2	\N
02cd9970-ab36-4a4a-a8ae-1bd439f3ba6b	Сертифікат GREENGUARD Gold для якості повітря | Містить 20% вторинних матеріалів | Низькі викиди ЛОС | Без свинцю та кадмію | Антимікробна обробка поверхні | Просте обслуговування нейтральними засобами | Повна переробка в кінці терміну служби	Екологія та безпека	TEXT	4	f	2025-09-09 15:16:36.244	2025-09-09 15:16:36.244	10aa3969-c8a7-4216-bc40-1b90ce706b87	\N
1298f1ab-3561-48dd-a03d-d76210b06ae6	Размер: 600×600×9.5mm бежевый (±0.1%) | Материал: Технический керамогранит | Поверхность: Матовая | Отклонение толщины: ±5% | Вес на м²: 22 кг | Разрывная нагрузка: >1800N | Предел прочности на изгиб: >35 MPa | Водопоглощение: ≤0.5% (EN ISO 10545-3) | Износостойкость: PEI IV (EN ISO 10545-7) | Противоскольжение: R10 (DIN 51130) | Морозостойкость: 100+ циклов	Технические характеристики	TEXT	1	f	2025-09-09 15:16:36.258	2025-09-09 15:16:36.258	f48394d3-8189-4501-b9e4-9e332f7d87a2	\N
261ae653-e2a9-4e3c-a5f5-2dcb66c7466f	Размер: 600×600×9,5мм (±0,1%) | Материал: Технический керамогранит | Поверхность: Матовая | Отклонение толщины: ±5% | Вес на м²: 22 кг | Разрывная нагрузка: >1800Н | Предел прочности на изгиб: >35 МПа | Водопоглощение: ≤0,5% (EN ISO 10545-3) | Износостойкость: PEI IV (EN ISO 10545-7) | Противоскольжение: R10 (DIN 51130) | Морозостойкость: 100+ циклов	Технические характеристики	TEXT	1	f	2025-09-09 15:16:36.29	2025-09-09 15:16:36.29	0a4b2875-9bcc-43ce-85ec-475039fbf1cd	\N
dca15ec4-6d1d-44c5-912d-32c2136946b5	Коэффициент теплового расширения: 7×10⁻⁶°C⁻¹ | Химическая стойкость: Класс А (EN ISO 10545-13) | Стойкость к пятнам: Класс 5 (EN ISO 10545-14) | Пожарный рейтинг: A1fl (EN 13501-1) | Стойкость к глубокому истиранию: ≤145 мм³ | Размерные отклонения: ±0,6% макс | Ректифицированные края | Твердость по Моосу: 6-7	Физико-химические свойства	TEXT	2	f	2025-09-09 15:16:36.304	2025-09-09 15:16:36.304	0a4b2875-9bcc-43ce-85ec-475039fbf1cd	\N
f2826f51-7d81-4d90-90e8-f105c784a72c	Рекомендуется для зон интенсивного коммерческого трафика. Совместим с системами теплого пола (макс 27°C). Укладка клеем класса C2TE для крупноформатной плитки. Ширина шва: 2-4мм. Возможна укладка на стены с надлежащей поддержкой. Подходит для бассейнов и влажных зон	Укладка и применение	TEXT	3	f	2025-09-09 15:16:36.315	2025-09-09 15:16:36.315	0a4b2875-9bcc-43ce-85ec-475039fbf1cd	\N
9318724c-a9c2-451f-b059-f8c9e4f25235	Сертификат GREENGUARD Gold для качества воздуха | Содержит 20% вторичных материалов | Низкие выбросы ЛОС | Без свинца и кадмия | Антимикробная обработка поверхности | Простое обслуживание нейтральными чистящими средствами | Полная переработка в конце срока службы	Экология и безопасность	TEXT	4	f	2025-09-09 15:16:36.326	2025-09-09 15:16:36.326	0a4b2875-9bcc-43ce-85ec-475039fbf1cd	\N
8a440bdc-cf6a-400f-81c7-68949a546acf	Размер: 600×600×9.5mm бежевый (±0.1%) | Материал: Технический керамогранит | Поверхность: Матовая | Отклонение толщины: ±5% | Вес на м²: 22 кг | Разрывная нагрузка: >1800N | Предел прочности на изгиб: >35 MPa | Водопоглощение: ≤0.5% (EN ISO 10545-3) | Износостойкость: PEI IV (EN ISO 10545-7) | Противоскольжение: R10 (DIN 51130) | Морозостойкость: 100+ циклов	Технические характеристики	TEXT	1	f	2025-09-09 15:16:36.342	2025-09-09 15:16:36.342	83edf8de-f606-42d7-9a08-1445a446d62c	\N
6a7e6ebb-0206-4c75-983a-ba9c35f21f05	Коэффициент теплового расширения: 7×10⁻⁶°C⁻¹ | Химическая стойкость: Class A (EN ISO 10545-13) | Стойкость к пятнам: Class 5 (EN ISO 10545-14) | Пожарный рейтинг: A1fl (EN 13501-1) | Стойкость к глубокому истиранию: ≤145 mm³ | Размерные отклонения: ±0,6% макс | Ректифицированные края | Твердость по Моосу: 6-7	Физико-химические свойства	TEXT	2	f	2025-09-09 15:16:36.358	2025-09-09 15:16:36.358	83edf8de-f606-42d7-9a08-1445a446d62c	\N
81541195-2180-4a7e-9d49-6322ff7e519d	Рекомендуется для зон интенсивного коммерческого трафика. Совместим с системами теплого пола (макс 27°C). Укладка клеем класса C2TE для крупноформатной плитки. Ширина шва: 2-4мм. Возможна укладка на стены с надлежащей поддержкой. Подходит для бассейнов и влажных зон	Укладка и применение	TEXT	3	f	2025-09-09 15:16:36.367	2025-09-09 15:16:36.367	83edf8de-f606-42d7-9a08-1445a446d62c	\N
42cd4200-a1be-4908-a494-13049546beee	Сертификат GREENGUARD Gold для качества воздуха | Содержит 20% вторичных материалов | Низкие выбросы ЛОС | Без свинца и кадмия | Антимикробная обработка поверхности | Простое обслуживание нейтральными чистящими средствами | Полная переработка в конце срока службы	Экология и безопасность	TEXT	4	f	2025-09-09 15:16:36.376	2025-09-09 15:16:36.376	83edf8de-f606-42d7-9a08-1445a446d62c	\N
eeb1cbf2-f1c8-4b6e-bd44-a5f90069188b	Размер: 600×600×9.5mm серый (±0.1%) | Материал: Технический керамогранит | Поверхность: Матовая | Отклонение толщины: ±5% | Вес на м²: 22 кг | Разрывная нагрузка: >1800N | Предел прочности на изгиб: >35 MPa | Водопоглощение: ≤0.5% (EN ISO 10545-3) | Износостойкость: PEI IV (EN ISO 10545-7) | Противоскольжение: R10 (DIN 51130) | Морозостойкость: 100+ циклов	Технические характеристики	TEXT	1	f	2025-09-09 15:16:36.392	2025-09-09 15:16:36.392	1bd6df34-b558-45db-9bd6-6e848eff805e	\N
f4f9d310-d490-42af-95d9-1cf0fe68691b	Коэффициент теплового расширения: 7×10⁻⁶°C⁻¹ | Химическая стойкость: Class A (EN ISO 10545-13) | Стойкость к пятнам: Class 5 (EN ISO 10545-14) | Пожарный рейтинг: A1fl (EN 13501-1) | Стойкость к глубокому истиранию: ≤145 mm³ | Размерные отклонения: ±0,6% макс | Ректифицированные края | Твердость по Моосу: 6-7	Физико-химические свойства	TEXT	2	f	2025-09-09 15:16:36.4	2025-09-09 15:16:36.4	1bd6df34-b558-45db-9bd6-6e848eff805e	\N
61513d62-745e-4203-88f6-8281561f1426	Рекомендуется для зон интенсивного коммерческого трафика. Совместим с системами теплого пола (макс 27°C). Укладка клеем класса C2TE для крупноформатной плитки. Ширина шва: 2-4мм. Возможна укладка на стены с надлежащей поддержкой. Подходит для бассейнов и влажных зон	Укладка и применение	TEXT	3	f	2025-09-09 15:16:36.405	2025-09-09 15:16:36.405	1bd6df34-b558-45db-9bd6-6e848eff805e	\N
994c1023-1b75-4309-bfcc-4fe71e3d095a	Сертификат GREENGUARD Gold для качества воздуха | Содержит 20% вторичных материалов | Низкие выбросы ЛОС | Без свинца и кадмия | Антимикробная обработка поверхности | Простое обслуживание нейтральными чистящими средствами | Полная переработка в конце срока службы	Экология и безопасность	TEXT	4	f	2025-09-09 15:16:36.41	2025-09-09 15:16:36.41	1bd6df34-b558-45db-9bd6-6e848eff805e	\N
2eaea1a8-f872-4bfb-bada-fb8aea5b83b6	Размер: 600×600×9.5mm (±0.1%) | Материал: Технический керамогранит | Поверхность: Матовая | Отклонение толщины: ±5% | Вес на м²: 22 кг | Разрывная нагрузка: >1800N | Предел прочности на изгиб: >35 MPa | Водопоглощение: ≤0.5% (EN ISO 10545-3) | Износостойкость: PEI IV (EN ISO 10545-7) | Противоскольжение: R10 (DIN 51130) | Морозостойкость: 100+ циклов	Технические характеристики	TEXT	1	f	2025-09-09 15:16:36.419	2025-09-09 15:16:36.419	6f070b19-c99f-4d64-b21b-b0673cf75345	\N
ebaf7abc-b949-477e-8904-1da3e302a47c	Рекомендуется для зон интенсивного коммерческого трафика. Совместим с системами теплого пола (макс 27°C). Укладка клеем класса C2TE для крупноформатной плитки. Ширина шва: 2-4мм. Возможна укладка на стены с надлежащей поддержкой. Подходит для бассейнов и влажных зон	Укладка и применение	TEXT	3	f	2025-09-09 15:16:36.462	2025-09-09 15:16:36.462	10762310-2ac4-4b65-b483-e7eeed2d4ba9	\N
1abedf01-803f-47f7-99ba-eb2923880233	Сертификат GREENGUARD Gold для качества воздуха | Содержит 20% вторичных материалов | Низкие выбросы ЛОС | Без свинца и кадмия | Антимикробная обработка поверхности | Простое обслуживание нейтральными чистящими средствами | Полная переработка в конце срока службы	Экология и безопасность	TEXT	4	f	2025-09-09 15:16:36.466	2025-09-09 15:16:36.466	10762310-2ac4-4b65-b483-e7eeed2d4ba9	\N
7e6b8a1c-0498-4c76-817b-8583fe24e8bf	Рекомендуется для зон интенсивного коммерческого трафика. Совместим с системами теплого пола (макс 27°C). Укладка клеем класса C2TE для крупноформатной плитки. Ширина шва: 2-4мм. Возможна укладка на стены с надлежащей поддержкой. Подходит для бассейнов и влажных зон	Укладка и применение	TEXT	3	f	2025-09-09 15:16:36.54	2025-09-09 15:16:36.54	be3a5acb-b68b-49f6-8c15-b2235a261a17	\N
96b95195-8665-479e-a364-13f5a300a3fb	Сертификат GREENGUARD Gold для качества воздуха | Содержит 20% вторичных материалов | Низкие выбросы ЛОС | Без свинца и кадмия | Антимикробная обработка поверхности | Простое обслуживание нейтральными чистящими средствами | Полная переработка в конце срока службы	Экология и безопасность	TEXT	4	f	2025-09-09 15:16:36.546	2025-09-09 15:16:36.546	be3a5acb-b68b-49f6-8c15-b2235a261a17	\N
d2f37338-0d2e-4294-9d80-aa762425c85a	Размер: 595×595×9mm черный под камень (±0.1%) | Материал: Технический керамогранит | Поверхность: Матовая | Отклонение толщины: ±5% | Вес на м²: 20 кг | Разрывная нагрузка: >1800N | Предел прочности на изгиб: >35 MPa | Водопоглощение: ≤0.5% (EN ISO 10545-3) | Износостойкость: PEI IV (EN ISO 10545-7) | Противоскольжение: R10 (DIN 51130) | Морозостойкость: 100+ циклов	Технические характеристики	TEXT	1	f	2025-09-09 15:16:36.556	2025-09-09 15:16:36.556	d60fdb31-8202-4ce5-afd4-6a004c05a351	\N
26e34865-dce7-46cb-bdf6-87e17ae34abe	Коэффициент теплового расширения: 7×10⁻⁶°C⁻¹ | Химическая стойкость: Class A (EN ISO 10545-13) | Стойкость к пятнам: Class 5 (EN ISO 10545-14) | Пожарный рейтинг: A1fl (EN 13501-1) | Стойкость к глубокому истиранию: ≤145 mm³ | Размерные отклонения: ±0,6% макс | Ректифицированные края | Твердость по Моосу: 6-7	Физико-химические свойства	TEXT	2	f	2025-09-09 15:16:36.561	2025-09-09 15:16:36.561	d60fdb31-8202-4ce5-afd4-6a004c05a351	\N
eaa4cca8-a1a3-4de7-90b2-ee94640979f4	Рекомендуется для зон интенсивного коммерческого трафика. Совместим с системами теплого пола (макс 27°C). Укладка клеем класса C2TE для крупноформатной плитки. Ширина шва: 2-4мм. Возможна укладка на стены с надлежащей поддержкой. Подходит для бассейнов и влажных зон	Укладка и применение	TEXT	3	f	2025-09-09 15:16:36.567	2025-09-09 15:16:36.567	d60fdb31-8202-4ce5-afd4-6a004c05a351	\N
1e508d10-e294-4b31-99f6-b30d8274c17f	Коэффициент теплового расширения: 7×10⁻⁶°C⁻¹ | Химическая стойкость: Class A (EN ISO 10545-13) | Стойкость к пятнам: Class 5 (EN ISO 10545-14) | Пожарный рейтинг: A1fl (EN 13501-1) | Стойкость к глубокому истиранию: ≤145 mm³ | Размерные отклонения: ±0,6% макс | Ректифицированные края | Твердость по Моосу: 6-7	Физико-химические свойства	TEXT	2	f	2025-09-09 15:16:36.424	2025-09-09 15:16:36.424	6f070b19-c99f-4d64-b21b-b0673cf75345	\N
4f4b2242-398f-45b9-b397-ebe1efb14a58	Рекомендуется для зон интенсивного коммерческого трафика. Совместим с системами теплого пола (макс 27°C). Укладка клеем класса C2TE для крупноформатной плитки. Ширина шва: 2-4мм. Возможна укладка на стены с надлежащей поддержкой. Подходит для бассейнов и влажных зон	Укладка и применение	TEXT	3	f	2025-09-09 15:16:36.437	2025-09-09 15:16:36.437	6f070b19-c99f-4d64-b21b-b0673cf75345	\N
1056f2e4-133f-4c47-8e4f-79c615cf9c69	Сертификат GREENGUARD Gold для качества воздуха | Содержит 20% вторичных материалов | Низкие выбросы ЛОС | Без свинца и кадмия | Антимикробная обработка поверхности | Простое обслуживание нейтральными чистящими средствами | Полная переработка в конце срока службы	Экология и безопасность	TEXT	4	f	2025-09-09 15:16:36.443	2025-09-09 15:16:36.443	6f070b19-c99f-4d64-b21b-b0673cf75345	\N
5f11c405-7dcd-4d49-a0cb-0ef2ae4c1222	Размер: 600×600×9.5mm (±0.1%) | Материал: Технический керамогранит | Поверхность: Матовая | Отклонение толщины: ±5% | Вес на м²: 22 кг | Разрывная нагрузка: >1800N | Предел прочности на изгиб: >35 MPa | Водопоглощение: ≤0.5% (EN ISO 10545-3) | Износостойкость: PEI IV (EN ISO 10545-7) | Противоскольжение: R10 (DIN 51130) | Морозостойкость: 100+ циклов	Технические характеристики	TEXT	1	f	2025-09-09 15:16:36.451	2025-09-09 15:16:36.451	10762310-2ac4-4b65-b483-e7eeed2d4ba9	\N
32bd3374-53f0-4dd1-b127-f45186ab6f5d	Коэффициент теплового расширения: 7×10⁻⁶°C⁻¹ | Химическая стойкость: Class A (EN ISO 10545-13) | Стойкость к пятнам: Class 5 (EN ISO 10545-14) | Пожарный рейтинг: A1fl (EN 13501-1) | Стойкость к глубокому истиранию: ≤145 mm³ | Размерные отклонения: ±0,6% макс | Ректифицированные края | Твердость по Моосу: 6-7	Физико-химические свойства	TEXT	2	f	2025-09-09 15:16:36.456	2025-09-09 15:16:36.456	10762310-2ac4-4b65-b483-e7eeed2d4ba9	\N
4ca627be-c819-4cc7-a3b8-647ec717508a	Размер: 600×600×9.5mm (±0.1%) | Материал: Технический керамогранит | Поверхность: Матовая | Отклонение толщины: ±5% | Вес на м²: 22 кг | Разрывная нагрузка: >1800N | Предел прочности на изгиб: >35 MPa | Водопоглощение: ≤0.5% (EN ISO 10545-3) | Износостойкость: PEI IV (EN ISO 10545-7) | Противоскольжение: R10 (DIN 51130) | Морозостойкость: 100+ циклов	Технические характеристики	TEXT	1	f	2025-09-09 15:16:36.472	2025-09-09 15:16:36.472	42fe45eb-b5cf-4d34-92df-3f87d7d6a98e	\N
3d724cfa-c08f-4fe6-978f-2ad9ae89e97a	Коэффициент теплового расширения: 7×10⁻⁶°C⁻¹ | Химическая стойкость: Class A (EN ISO 10545-13) | Стойкость к пятнам: Class 5 (EN ISO 10545-14) | Пожарный рейтинг: A1fl (EN 13501-1) | Стойкость к глубокому истиранию: ≤145 mm³ | Размерные отклонения: ±0,6% макс | Ректифицированные края | Твердость по Моосу: 6-7	Физико-химические свойства	TEXT	2	f	2025-09-09 15:16:36.489	2025-09-09 15:16:36.489	42fe45eb-b5cf-4d34-92df-3f87d7d6a98e	\N
b98c57c1-f2dd-456d-8cb8-21db7c853a9c	Рекомендуется для зон интенсивного коммерческого трафика. Совместим с системами теплого пола (макс 27°C). Укладка клеем класса C2TE для крупноформатной плитки. Ширина шва: 2-4мм. Возможна укладка на стены с надлежащей поддержкой. Подходит для бассейнов и влажных зон	Укладка и применение	TEXT	3	f	2025-09-09 15:16:36.494	2025-09-09 15:16:36.494	42fe45eb-b5cf-4d34-92df-3f87d7d6a98e	\N
50175cdd-2cdd-488f-b816-afda53a153fa	Сертификат GREENGUARD Gold для качества воздуха | Содержит 20% вторичных материалов | Низкие выбросы ЛОС | Без свинца и кадмия | Антимикробная обработка поверхности | Простое обслуживание нейтральными чистящими средствами | Полная переработка в конце срока службы	Экология и безопасность	TEXT	4	f	2025-09-09 15:16:36.497	2025-09-09 15:16:36.497	42fe45eb-b5cf-4d34-92df-3f87d7d6a98e	\N
de16a52e-5a70-4640-a20b-2669264264e1	Размер: 607×607×9mm серый (±0.1%) | Материал: Технический керамогранит | Поверхность: Матовая | Отклонение толщины: ±5% | Вес на м²: 21 кг | Разрывная нагрузка: >1800N | Предел прочности на изгиб: >35 MPa | Водопоглощение: ≤0.5% (EN ISO 10545-3) | Износостойкость: PEI IV (EN ISO 10545-7) | Противоскольжение: R10 (DIN 51130) | Морозостойкость: 100+ циклов	Технические характеристики	TEXT	1	f	2025-09-09 15:16:36.504	2025-09-09 15:16:36.504	56b868fe-2b41-4fd1-b1d0-e990c9e09683	\N
830c3027-71e7-464c-a6e6-805ab0a1b04a	Коэффициент теплового расширения: 7×10⁻⁶°C⁻¹ | Химическая стойкость: Class A (EN ISO 10545-13) | Стойкость к пятнам: Class 5 (EN ISO 10545-14) | Пожарный рейтинг: A1fl (EN 13501-1) | Стойкость к глубокому истиранию: ≤145 mm³ | Размерные отклонения: ±0,6% макс | Ректифицированные края | Твердость по Моосу: 6-7	Физико-химические свойства	TEXT	2	f	2025-09-09 15:16:36.508	2025-09-09 15:16:36.508	56b868fe-2b41-4fd1-b1d0-e990c9e09683	\N
68d63a47-57fa-4d34-a313-f59c45aeac5f	Рекомендуется для зон интенсивного коммерческого трафика. Совместим с системами теплого пола (макс 27°C). Укладка клеем класса C2TE для крупноформатной плитки. Ширина шва: 2-4мм. Возможна укладка на стены с надлежащей поддержкой. Подходит для бассейнов и влажных зон	Укладка и применение	TEXT	3	f	2025-09-09 15:16:36.515	2025-09-09 15:16:36.515	56b868fe-2b41-4fd1-b1d0-e990c9e09683	\N
5593e33e-443a-41db-97dd-e99611db4b81	Сертификат GREENGUARD Gold для качества воздуха | Содержит 20% вторичных материалов | Низкие выбросы ЛОС | Без свинца и кадмия | Антимикробная обработка поверхности | Простое обслуживание нейтральными чистящими средствами | Полная переработка в конце срока службы	Экология и безопасность	TEXT	4	f	2025-09-09 15:16:36.522	2025-09-09 15:16:36.522	56b868fe-2b41-4fd1-b1d0-e990c9e09683	\N
639dcdc4-e72a-4b0f-bbac-e2198f749ebc	Размер: 595×595×9mm серый под камень (±0.1%) | Материал: Технический керамогранит | Поверхность: Матовая | Отклонение толщины: ±5% | Вес на м²: 20 кг | Разрывная нагрузка: >1800N | Предел прочности на изгиб: >35 MPa | Водопоглощение: ≤0.5% (EN ISO 10545-3) | Износостойкость: PEI IV (EN ISO 10545-7) | Противоскольжение: R10 (DIN 51130) | Морозостойкость: 100+ циклов	Технические характеристики	TEXT	1	f	2025-09-09 15:16:36.529	2025-09-09 15:16:36.529	be3a5acb-b68b-49f6-8c15-b2235a261a17	\N
87522f93-47d6-4e52-bbd2-d9df71eaa0f0	Коэффициент теплового расширения: 7×10⁻⁶°C⁻¹ | Химическая стойкость: Class A (EN ISO 10545-13) | Стойкость к пятнам: Class 5 (EN ISO 10545-14) | Пожарный рейтинг: A1fl (EN 13501-1) | Стойкость к глубокому истиранию: ≤145 mm³ | Размерные отклонения: ±0,6% макс | Ректифицированные края | Твердость по Моосу: 6-7	Физико-химические свойства	TEXT	2	f	2025-09-09 15:16:36.533	2025-09-09 15:16:36.533	be3a5acb-b68b-49f6-8c15-b2235a261a17	\N
39641061-f370-48d4-92d9-2867c82347e8	Размер: 595×595×9mm матовый/глянцевый (±0.1%) | Материал: Технический керамогранит | Поверхность: Матовая | Отклонение толщины: ±5% | Вес на м²: 20 кг | Разрывная нагрузка: >1800N | Предел прочности на изгиб: >35 MPa | Водопоглощение: ≤0.5% (EN ISO 10545-3) | Износостойкость: PEI IV (EN ISO 10545-7) | Противоскольжение: R10 (DIN 51130) | Морозостойкость: 100+ циклов	Технические характеристики	TEXT	1	f	2025-09-09 15:16:36.58	2025-09-09 15:16:36.58	87282ec0-a75d-445e-b10b-28a5c0b5fc8f	\N
33e20f83-5e6e-4aa9-ab1b-31f0bfe625e4	Коэффициент теплового расширения: 7×10⁻⁶°C⁻¹ | Химическая стойкость: Class A (EN ISO 10545-13) | Стойкость к пятнам: Class 5 (EN ISO 10545-14) | Пожарный рейтинг: A1fl (EN 13501-1) | Стойкость к глубокому истиранию: ≤145 mm³ | Размерные отклонения: ±0,6% макс | Ректифицированные края | Твердость по Моосу: 6-7	Физико-химические свойства	TEXT	2	f	2025-09-09 15:16:36.586	2025-09-09 15:16:36.586	87282ec0-a75d-445e-b10b-28a5c0b5fc8f	\N
fde14ef2-0cbd-4bdd-9353-e796215da67a	GREENGUARD Gold certified for indoor air quality | Contains 20% recycled materials | Low VOC emissions | Lead and cadmium free | Antimicrobial surface treatment | Easy maintenance with standard pH neutral cleaners | Recyclable at end of life	Environmental & Safety	TEXT	4	f	2025-09-09 15:16:36.612	2025-09-09 15:16:36.612	8af915d9-7af2-49d5-b69a-049403e39ed0	\N
632ab1f5-c3c6-44c1-aef8-e671976d3f85	Size: 600×600×9.5mm (±0.1%) | Material: Technical porcelain stoneware | Surface: Matte finish | Thickness tolerance: ±5% | Weight per m²: 22 kg | Breaking strength: >1800N | Modulus of rupture: >35 MPa | Water absorption: ≤0.5% (EN ISO 10545-3) | Wear resistance: PEI IV (EN ISO 10545-7) | Slip resistance: R10 (DIN 51130) | Frost resistance: 100+ freeze-thaw cycles	Technical Specifications	TEXT	1	f	2025-09-09 15:16:36.619	2025-09-09 15:16:36.619	1570f4bc-548f-412e-addd-4c9490e32a74	\N
e4a374c3-395f-4774-804e-92021dcf532e	Thermal expansion coefficient: 7×10⁻⁶°C⁻¹ | Chemical resistance: Class A (EN ISO 10545-13) | Stain resistance: Class 5 (EN ISO 10545-14) | Fire rating: A1fl (EN 13501-1) | Deep abrasion resistance: ≤145 mm³ | Length and width: ±0.6% max | Rectified edges for minimal joints | Mohs hardness: 6-7	Physical & Chemical Properties	TEXT	2	f	2025-09-09 15:16:36.626	2025-09-09 15:16:36.626	1570f4bc-548f-412e-addd-4c9490e32a74	\N
4fbde158-42cb-4a46-87bb-0ee0dd1502c8	Recommended for heavy commercial traffic areas. Suitable for underfloor heating systems (max 27°C). Install with C2TE adhesive for large format tiles. Joint width: 2-4mm. Can be installed on walls with proper support. Suitable for swimming pools and wet areas	Installation & Application	TEXT	3	f	2025-09-09 15:16:36.629	2025-09-09 15:16:36.629	1570f4bc-548f-412e-addd-4c9490e32a74	\N
4f747ab9-46f7-46f3-b232-3c54b941a2d8	GREENGUARD Gold certified for indoor air quality | Contains 20% recycled materials | Low VOC emissions | Lead and cadmium free | Antimicrobial surface treatment | Easy maintenance with standard pH neutral cleaners | Recyclable at end of life	Environmental & Safety	TEXT	4	f	2025-09-09 15:16:36.634	2025-09-09 15:16:36.634	1570f4bc-548f-412e-addd-4c9490e32a74	\N
93e3917d-aaf5-4d3e-b08b-63532178cfcd	Size: 600×600×9.5mm beige (±0.1%) | Material: Technical porcelain stoneware | Surface: Matte finish | Thickness tolerance: ±5% | Weight per m²: 22 kg | Breaking strength: >1800N | Modulus of rupture: >35 MPa | Water absorption: ≤0.5% (EN ISO 10545-3) | Wear resistance: PEI IV (EN ISO 10545-7) | Slip resistance: R10 (DIN 51130) | Frost resistance: 100+ freeze-thaw cycles	Technical Specifications	TEXT	1	f	2025-09-09 15:16:36.644	2025-09-09 15:16:36.644	86c23faf-cbd5-47a5-8ba6-4eb3d17b81f3	\N
3fcafdeb-ffdd-4b54-9f37-41cd293cbeb8	Thermal expansion coefficient: 7×10⁻⁶°C⁻¹ | Chemical resistance: Class A (EN ISO 10545-13) | Stain resistance: Class 5 (EN ISO 10545-14) | Fire rating: A1fl (EN 13501-1) | Deep abrasion resistance: ≤145 mm³ | Length and width: ±0.6% max | Rectified edges for minimal joints | Mohs hardness: 6-7	Physical & Chemical Properties	TEXT	2	f	2025-09-09 15:16:36.653	2025-09-09 15:16:36.653	86c23faf-cbd5-47a5-8ba6-4eb3d17b81f3	\N
8036be66-4e97-46dc-8b3c-43597a1f80c7	Recommended for heavy commercial traffic areas. Suitable for underfloor heating systems (max 27°C). Install with C2TE adhesive for large format tiles. Joint width: 2-4mm. Can be installed on walls with proper support. Suitable for swimming pools and wet areas	Installation & Application	TEXT	3	f	2025-09-09 15:16:36.659	2025-09-09 15:16:36.659	86c23faf-cbd5-47a5-8ba6-4eb3d17b81f3	\N
3a193d72-7d5a-4990-b10a-91f842c8c0e8	Сертификат GREENGUARD Gold для качества воздуха | Содержит 20% вторичных материалов | Низкие выбросы ЛОС | Без свинца и кадмия | Антимикробная обработка поверхности | Простое обслуживание нейтральными чистящими средствами | Полная переработка в конце срока службы	Экология и безопасность	TEXT	4	f	2025-09-09 15:16:36.571	2025-09-09 15:16:36.571	d60fdb31-8202-4ce5-afd4-6a004c05a351	\N
7caeb079-16d8-4503-981d-c1a41299edc1	Рекомендуется для зон интенсивного коммерческого трафика. Совместим с системами теплого пола (макс 27°C). Укладка клеем класса C2TE для крупноформатной плитки. Ширина шва: 2-4мм. Возможна укладка на стены с надлежащей поддержкой. Подходит для бассейнов и влажных зон	Укладка и применение	TEXT	3	f	2025-09-09 15:16:36.59	2025-09-09 15:16:36.59	87282ec0-a75d-445e-b10b-28a5c0b5fc8f	\N
f6ce0810-80f1-4d79-9cfb-e16afba11e78	Сертификат GREENGUARD Gold для качества воздуха | Содержит 20% вторичных материалов | Низкие выбросы ЛОС | Без свинца и кадмия | Антимикробная обработка поверхности | Простое обслуживание нейтральными чистящими средствами | Полная переработка в конце срока службы	Экология и безопасность	TEXT	4	f	2025-09-09 15:16:36.593	2025-09-09 15:16:36.593	87282ec0-a75d-445e-b10b-28a5c0b5fc8f	\N
f68706c8-6eae-4d0c-a339-d88aa85a0856	Size: 600×600×9.5mm beige (±0.1%) | Material: Technical porcelain stoneware | Surface: Matte finish | Thickness tolerance: ±5% | Weight per m²: 22 kg | Breaking strength: >1800N | Modulus of rupture: >35 MPa | Water absorption: ≤0.5% (EN ISO 10545-3) | Wear resistance: PEI IV (EN ISO 10545-7) | Slip resistance: R10 (DIN 51130) | Frost resistance: 100+ freeze-thaw cycles	Technical Specifications	TEXT	1	f	2025-09-09 15:16:36.601	2025-09-09 15:16:36.601	8af915d9-7af2-49d5-b69a-049403e39ed0	\N
fdd7dc8e-d68f-4ceb-9523-18bc687134da	Thermal expansion coefficient: 7×10⁻⁶°C⁻¹ | Chemical resistance: Class A (EN ISO 10545-13) | Stain resistance: Class 5 (EN ISO 10545-14) | Fire rating: A1fl (EN 13501-1) | Deep abrasion resistance: ≤145 mm³ | Length and width: ±0.6% max | Rectified edges for minimal joints | Mohs hardness: 6-7	Physical & Chemical Properties	TEXT	2	f	2025-09-09 15:16:36.604	2025-09-09 15:16:36.604	8af915d9-7af2-49d5-b69a-049403e39ed0	\N
26ea3b8b-0f5c-403d-85f8-97d463ab789c	Recommended for heavy commercial traffic areas. Suitable for underfloor heating systems (max 27°C). Install with C2TE adhesive for large format tiles. Joint width: 2-4mm. Can be installed on walls with proper support. Suitable for swimming pools and wet areas	Installation & Application	TEXT	3	f	2025-09-09 15:16:36.607	2025-09-09 15:16:36.607	8af915d9-7af2-49d5-b69a-049403e39ed0	\N
9c51f0b1-466f-4dc8-a7d9-98251bf5fa15	Thermal expansion coefficient: 7×10⁻⁶°C⁻¹ | Chemical resistance: Class A (EN ISO 10545-13) | Stain resistance: Class 5 (EN ISO 10545-14) | Fire rating: A1fl (EN 13501-1) | Deep abrasion resistance: ≤145 mm³ | Length and width: ±0.6% max | Rectified edges for minimal joints | Mohs hardness: 6-7	Physical & Chemical Properties	TEXT	2	f	2025-09-09 15:16:36.707	2025-09-09 15:16:36.707	ddc1ea1d-9aba-414e-a88a-6588f323c747	\N
c11582de-15c6-45eb-af8d-3e261a9da510	Recommended for heavy commercial traffic areas. Suitable for underfloor heating systems (max 27°C). Install with C2TE adhesive for large format tiles. Joint width: 2-4mm. Can be installed on walls with proper support. Suitable for swimming pools and wet areas	Installation & Application	TEXT	3	f	2025-09-09 15:16:36.713	2025-09-09 15:16:36.713	ddc1ea1d-9aba-414e-a88a-6588f323c747	\N
1aa1af91-439b-4c81-96a4-d83e0beec62a	GREENGUARD Gold certified for indoor air quality | Contains 20% recycled materials | Low VOC emissions | Lead and cadmium free | Antimicrobial surface treatment | Easy maintenance with standard pH neutral cleaners | Recyclable at end of life	Environmental & Safety	TEXT	4	f	2025-09-09 15:16:36.717	2025-09-09 15:16:36.717	ddc1ea1d-9aba-414e-a88a-6588f323c747	\N
78207667-01fb-498a-8f18-131f498f8522	Size: 600×600×9.5mm (±0.1%) | Material: Technical porcelain stoneware | Surface: Matte finish | Thickness tolerance: ±5% | Weight per m²: 22 kg | Breaking strength: >1800N | Modulus of rupture: >35 MPa | Water absorption: ≤0.5% (EN ISO 10545-3) | Wear resistance: PEI IV (EN ISO 10545-7) | Slip resistance: R10 (DIN 51130) | Frost resistance: 100+ freeze-thaw cycles	Technical Specifications	TEXT	1	f	2025-09-09 15:16:36.726	2025-09-09 15:16:36.726	cd504792-95d0-4654-b357-4206b909b3d7	\N
593ec709-b62e-4f01-9973-ccf723af6db4	Thermal expansion coefficient: 7×10⁻⁶°C⁻¹ | Chemical resistance: Class A (EN ISO 10545-13) | Stain resistance: Class 5 (EN ISO 10545-14) | Fire rating: A1fl (EN 13501-1) | Deep abrasion resistance: ≤145 mm³ | Length and width: ±0.6% max | Rectified edges for minimal joints | Mohs hardness: 6-7	Physical & Chemical Properties	TEXT	2	f	2025-09-09 15:16:36.731	2025-09-09 15:16:36.731	cd504792-95d0-4654-b357-4206b909b3d7	\N
6627ea4e-d376-410f-bdbd-1f9eb70702f6	Recommended for heavy commercial traffic areas. Suitable for underfloor heating systems (max 27°C). Install with C2TE adhesive for large format tiles. Joint width: 2-4mm. Can be installed on walls with proper support. Suitable for swimming pools and wet areas	Installation & Application	TEXT	3	f	2025-09-09 15:16:36.736	2025-09-09 15:16:36.736	cd504792-95d0-4654-b357-4206b909b3d7	\N
93c27ede-4f0d-409c-b130-f1a76d202bbe	GREENGUARD Gold certified for indoor air quality | Contains 20% recycled materials | Low VOC emissions | Lead and cadmium free | Antimicrobial surface treatment | Easy maintenance with standard pH neutral cleaners | Recyclable at end of life	Environmental & Safety	TEXT	4	f	2025-09-09 15:16:36.745	2025-09-09 15:16:36.745	cd504792-95d0-4654-b357-4206b909b3d7	\N
74642263-693e-43c1-8a25-bf69d303c1e8	Size: 600×600×9.5mm (±0.1%) | Material: Technical porcelain stoneware | Surface: Matte finish | Thickness tolerance: ±5% | Weight per m²: 22 kg | Breaking strength: >1800N | Modulus of rupture: >35 MPa | Water absorption: ≤0.5% (EN ISO 10545-3) | Wear resistance: PEI IV (EN ISO 10545-7) | Slip resistance: R10 (DIN 51130) | Frost resistance: 100+ freeze-thaw cycles	Technical Specifications	TEXT	1	f	2025-09-09 15:16:36.759	2025-09-09 15:16:36.759	c2ad5e51-6e17-4bfb-898b-28518ee4ca88	\N
3e31e1c3-f8e7-4e13-bf64-673485b647e4	GREENGUARD Gold certified for indoor air quality | Contains 20% recycled materials | Low VOC emissions | Lead and cadmium free | Antimicrobial surface treatment | Easy maintenance with standard pH neutral cleaners | Recyclable at end of life	Environmental & Safety	TEXT	4	f	2025-09-09 15:16:36.789	2025-09-09 15:16:36.789	c2ad5e51-6e17-4bfb-898b-28518ee4ca88	\N
cf97636d-9b71-4447-84ce-6ab7249dcb04	Size: 600×600×9.5mm grey (±0.1%) | Material: Technical porcelain stoneware | Surface: Matte finish | Thickness tolerance: ±5% | Weight per m²: 22 kg | Breaking strength: >1800N | Modulus of rupture: >35 MPa | Water absorption: ≤0.5% (EN ISO 10545-3) | Wear resistance: PEI IV (EN ISO 10545-7) | Slip resistance: R10 (DIN 51130) | Frost resistance: 100+ freeze-thaw cycles	Technical Specifications	TEXT	1	f	2025-09-09 15:16:36.672	2025-09-09 15:16:36.672	e04c2799-4ed0-48cf-90bf-f412015e2331	\N
78230af8-2503-4bc2-8416-92d2750c5f78	Thermal expansion coefficient: 7×10⁻⁶°C⁻¹ | Chemical resistance: Class A (EN ISO 10545-13) | Stain resistance: Class 5 (EN ISO 10545-14) | Fire rating: A1fl (EN 13501-1) | Deep abrasion resistance: ≤145 mm³ | Length and width: ±0.6% max | Rectified edges for minimal joints | Mohs hardness: 6-7	Physical & Chemical Properties	TEXT	2	f	2025-09-09 15:16:36.677	2025-09-09 15:16:36.677	e04c2799-4ed0-48cf-90bf-f412015e2331	\N
403079a2-779f-4f15-bd38-05a554919cc4	Recommended for heavy commercial traffic areas. Suitable for underfloor heating systems (max 27°C). Install with C2TE adhesive for large format tiles. Joint width: 2-4mm. Can be installed on walls with proper support. Suitable for swimming pools and wet areas	Installation & Application	TEXT	3	f	2025-09-09 15:16:36.683	2025-09-09 15:16:36.683	e04c2799-4ed0-48cf-90bf-f412015e2331	\N
3ef89f09-4a99-4eac-acf4-183d1f1fda78	GREENGUARD Gold certified for indoor air quality | Contains 20% recycled materials | Low VOC emissions | Lead and cadmium free | Antimicrobial surface treatment | Easy maintenance with standard pH neutral cleaners | Recyclable at end of life	Environmental & Safety	TEXT	4	f	2025-09-09 15:16:36.69	2025-09-09 15:16:36.69	e04c2799-4ed0-48cf-90bf-f412015e2331	\N
05d41aad-a094-4a28-90d7-bb7a447ba8c5	Size: 600×600×9.5mm (±0.1%) | Material: Technical porcelain stoneware | Surface: Matte finish | Thickness tolerance: ±5% | Weight per m²: 22 kg | Breaking strength: >1800N | Modulus of rupture: >35 MPa | Water absorption: ≤0.5% (EN ISO 10545-3) | Wear resistance: PEI IV (EN ISO 10545-7) | Slip resistance: R10 (DIN 51130) | Frost resistance: 100+ freeze-thaw cycles	Technical Specifications	TEXT	1	f	2025-09-09 15:16:36.702	2025-09-09 15:16:36.702	ddc1ea1d-9aba-414e-a88a-6588f323c747	\N
5b376895-34a5-4484-921e-fd5d83d4de4a	Thermal expansion coefficient: 7×10⁻⁶°C⁻¹ | Chemical resistance: Class A (EN ISO 10545-13) | Stain resistance: Class 5 (EN ISO 10545-14) | Fire rating: A1fl (EN 13501-1) | Deep abrasion resistance: ≤145 mm³ | Length and width: ±0.6% max | Rectified edges for minimal joints | Mohs hardness: 6-7	Physical & Chemical Properties	TEXT	2	f	2025-09-09 15:16:36.767	2025-09-09 15:16:36.767	c2ad5e51-6e17-4bfb-898b-28518ee4ca88	\N
c6afa281-b210-464e-bc47-583e69c155c7	Recommended for heavy commercial traffic areas. Suitable for underfloor heating systems (max 27°C). Install with C2TE adhesive for large format tiles. Joint width: 2-4mm. Can be installed on walls with proper support. Suitable for swimming pools and wet areas	Installation & Application	TEXT	3	f	2025-09-09 15:16:36.776	2025-09-09 15:16:36.776	c2ad5e51-6e17-4bfb-898b-28518ee4ca88	\N
ecbc194d-48d7-4ea5-81dc-6ed073ec22b1	Recommended for heavy commercial traffic areas. Suitable for underfloor heating systems (max 27°C). Install with C2TE adhesive for large format tiles. Joint width: 2-4mm. Can be installed on walls with proper support. Suitable for swimming pools and wet areas	Installation & Application	TEXT	3	f	2025-09-09 15:16:36.818	2025-09-09 15:16:36.818	4cf5bb4a-3c8a-46c1-b43c-c21dc5e3223c	\N
9639c7d5-2345-4659-bcef-bc6fed1739cf	GREENGUARD Gold certified for indoor air quality | Contains 20% recycled materials | Low VOC emissions | Lead and cadmium free | Antimicrobial surface treatment | Easy maintenance with standard pH neutral cleaners | Recyclable at end of life	Environmental & Safety	TEXT	4	f	2025-09-09 15:16:36.821	2025-09-09 15:16:36.821	4cf5bb4a-3c8a-46c1-b43c-c21dc5e3223c	\N
c476f3ef-6f8a-4d56-b500-bf1f209d1c4e	Size: 607×607×9mm grey (±0.1%) | Material: Technical porcelain stoneware | Surface: Matte finish | Thickness tolerance: ±5% | Weight per m²: 21 kg | Breaking strength: >1800N | Modulus of rupture: >35 MPa | Water absorption: ≤0.5% (EN ISO 10545-3) | Wear resistance: PEI IV (EN ISO 10545-7) | Slip resistance: R10 (DIN 51130) | Frost resistance: 100+ freeze-thaw cycles	Technical Specifications	TEXT	1	f	2025-09-09 15:16:36.807	2025-09-09 15:16:36.807	4cf5bb4a-3c8a-46c1-b43c-c21dc5e3223c	\N
11a3bbea-40b8-419a-9a3f-7d3cc237fb1e	Thermal expansion coefficient: 7×10⁻⁶°C⁻¹ | Chemical resistance: Class A (EN ISO 10545-13) | Stain resistance: Class 5 (EN ISO 10545-14) | Fire rating: A1fl (EN 13501-1) | Deep abrasion resistance: ≤145 mm³ | Length and width: ±0.6% max | Rectified edges for minimal joints | Mohs hardness: 6-7	Physical & Chemical Properties	TEXT	2	f	2025-09-09 15:16:36.812	2025-09-09 15:16:36.812	4cf5bb4a-3c8a-46c1-b43c-c21dc5e3223c	\N
37452a19-5cb7-4f63-a3ce-df4f9ea941f5	Size: 595×595×9mm grey stone effect (±0.1%) | Material: Technical porcelain stoneware | Surface: Matte finish | Thickness tolerance: ±5% | Weight per m²: 20 kg | Breaking strength: >1800N | Modulus of rupture: >35 MPa | Water absorption: ≤0.5% (EN ISO 10545-3) | Wear resistance: PEI IV (EN ISO 10545-7) | Slip resistance: R10 (DIN 51130) | Frost resistance: 100+ freeze-thaw cycles	Technical Specifications	TEXT	1	f	2025-09-09 15:16:36.837	2025-09-09 15:16:36.837	87667b62-4d46-42d8-bafe-d711fc96cf61	\N
f688404f-7018-4665-84a5-53a3eb3a194d	Thermal expansion coefficient: 7×10⁻⁶°C⁻¹ | Chemical resistance: Class A (EN ISO 10545-13) | Stain resistance: Class 5 (EN ISO 10545-14) | Fire rating: A1fl (EN 13501-1) | Deep abrasion resistance: ≤145 mm³ | Length and width: ±0.6% max | Rectified edges for minimal joints | Mohs hardness: 6-7	Physical & Chemical Properties	TEXT	2	f	2025-09-09 15:16:36.844	2025-09-09 15:16:36.844	87667b62-4d46-42d8-bafe-d711fc96cf61	\N
b24fb468-5ce0-4a22-9691-2cb7359e936f	Recommended for heavy commercial traffic areas. Suitable for underfloor heating systems (max 27°C). Install with C2TE adhesive for large format tiles. Joint width: 2-4mm. Can be installed on walls with proper support. Suitable for swimming pools and wet areas	Installation & Application	TEXT	3	f	2025-09-09 15:16:36.853	2025-09-09 15:16:36.853	87667b62-4d46-42d8-bafe-d711fc96cf61	\N
3a420fcc-c086-406b-b173-e6879285dcb3	GREENGUARD Gold certified for indoor air quality | Contains 20% recycled materials | Low VOC emissions | Lead and cadmium free | Antimicrobial surface treatment | Easy maintenance with standard pH neutral cleaners | Recyclable at end of life	Environmental & Safety	TEXT	4	f	2025-09-09 15:16:36.868	2025-09-09 15:16:36.868	87667b62-4d46-42d8-bafe-d711fc96cf61	\N
21541284-946a-4c4c-85d8-97fcff4c7136	Size: 595×595×9mm black stone effect (±0.1%) | Material: Technical porcelain stoneware | Surface: Matte finish | Thickness tolerance: ±5% | Weight per m²: 20 kg | Breaking strength: >1800N | Modulus of rupture: >35 MPa | Water absorption: ≤0.5% (EN ISO 10545-3) | Wear resistance: PEI IV (EN ISO 10545-7) | Slip resistance: R10 (DIN 51130) | Frost resistance: 100+ freeze-thaw cycles	Technical Specifications	TEXT	1	f	2025-09-09 15:16:36.885	2025-09-09 15:16:36.885	0e74ce0e-dee2-4765-bda7-e8431a036b6b	\N
ba96db89-9b04-4f0f-ab18-58a9a695cc39	Thermal expansion coefficient: 7×10⁻⁶°C⁻¹ | Chemical resistance: Class A (EN ISO 10545-13) | Stain resistance: Class 5 (EN ISO 10545-14) | Fire rating: A1fl (EN 13501-1) | Deep abrasion resistance: ≤145 mm³ | Length and width: ±0.6% max | Rectified edges for minimal joints | Mohs hardness: 6-7	Physical & Chemical Properties	TEXT	2	f	2025-09-09 15:16:36.89	2025-09-09 15:16:36.89	0e74ce0e-dee2-4765-bda7-e8431a036b6b	\N
a121ced4-e3be-47c8-b907-4e0f8147d81e	Recommended for heavy commercial traffic areas. Suitable for underfloor heating systems (max 27°C). Install with C2TE adhesive for large format tiles. Joint width: 2-4mm. Can be installed on walls with proper support. Suitable for swimming pools and wet areas	Installation & Application	TEXT	3	f	2025-09-09 15:16:36.897	2025-09-09 15:16:36.897	0e74ce0e-dee2-4765-bda7-e8431a036b6b	\N
6ae96a54-60f4-47fd-a360-6240b44c0a13	GREENGUARD Gold certified for indoor air quality | Contains 20% recycled materials | Low VOC emissions | Lead and cadmium free | Antimicrobial surface treatment | Easy maintenance with standard pH neutral cleaners | Recyclable at end of life	Environmental & Safety	TEXT	4	f	2025-09-09 15:16:36.903	2025-09-09 15:16:36.903	0e74ce0e-dee2-4765-bda7-e8431a036b6b	\N
aa2fefb3-1c0d-47f7-9014-9ef80bb9cfcc	Size: 595×595×9mm matte/glossy finish (±0.1%) | Material: Technical porcelain stoneware | Surface: Matte finish | Thickness tolerance: ±5% | Weight per m²: 20 kg | Breaking strength: >1800N | Modulus of rupture: >35 MPa | Water absorption: ≤0.5% (EN ISO 10545-3) | Wear resistance: PEI IV (EN ISO 10545-7) | Slip resistance: R10 (DIN 51130) | Frost resistance: 100+ freeze-thaw cycles	Technical Specifications	TEXT	1	f	2025-09-09 15:16:36.914	2025-09-09 15:16:36.914	18ffc472-04b0-45ca-a31e-c8f55c2a498c	\N
94548459-2064-492c-afec-f5874bfa1794	Thermal expansion coefficient: 7×10⁻⁶°C⁻¹ | Chemical resistance: Class A (EN ISO 10545-13) | Stain resistance: Class 5 (EN ISO 10545-14) | Fire rating: A1fl (EN 13501-1) | Deep abrasion resistance: ≤145 mm³ | Length and width: ±0.6% max | Rectified edges for minimal joints | Mohs hardness: 6-7	Physical & Chemical Properties	TEXT	2	f	2025-09-09 15:16:36.925	2025-09-09 15:16:36.925	18ffc472-04b0-45ca-a31e-c8f55c2a498c	\N
0b12bfe7-0ff3-4478-ad63-707b27e89b3a	Recommended for heavy commercial traffic areas. Suitable for underfloor heating systems (max 27°C). Install with C2TE adhesive for large format tiles. Joint width: 2-4mm. Can be installed on walls with proper support. Suitable for swimming pools and wet areas	Installation & Application	TEXT	3	f	2025-09-09 15:16:36.93	2025-09-09 15:16:36.93	18ffc472-04b0-45ca-a31e-c8f55c2a498c	\N
a1fc4f07-fba2-4274-a08f-a77da2f376c0	GREENGUARD Gold certified for indoor air quality | Contains 20% recycled materials | Low VOC emissions | Lead and cadmium free | Antimicrobial surface treatment | Easy maintenance with standard pH neutral cleaners | Recyclable at end of life	Environmental & Safety	TEXT	4	f	2025-09-09 15:16:36.937	2025-09-09 15:16:36.937	18ffc472-04b0-45ca-a31e-c8f55c2a498c	\N
\.


--
-- Data for Name: local_products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.local_products (id, name, description, price, discount_price, is_excluded, created, updated, product_id, locale_id) FROM stdin;
ce7c4fed-4589-4edd-8fb2-ceae30495279	Gres Atem Space Stone Black 595×595×9 mm, czarny, matowy	Stylowa uniwersalna płytka w kolorze czarnym o matowej powierzchni. Forma kwadratowa, mrozoodporna. Do wnętrz i na zewnątrz. Nowoczesny design z teksturą kamienia i wyjątkową wytrzymałością.	140	\N	f	2025-09-09 15:16:34.628	2025-10-07 16:32:02	a7989629-41df-46b3-a90a-de1d5435263f	4b4a4dbd-1e2f-4a42-9ce3-eb9a4053e0d0
e28659af-1167-48a4-9849-f9e368983828	Gres Atem Space Stone 595×595×9 mm, szary, matowy	Uniwersalna płytka podłogowa o matowej powierzchni. Forma kwadratowa, mrozoodporna. Idealna do nowoczesnych wnętrz z wyglądem naturalnego kamienia i doskonałymi właściwościami technicznymi.	140	\N	f	2025-09-09 15:16:34.618	2025-10-07 16:32:07.897	d314b6ef-079e-4548-a51f-5c9b74ee8b3b	4b4a4dbd-1e2f-4a42-9ce3-eb9a4053e0d0
691d9176-9b81-4402-8913-3d468a23641e	Gres Atem Hygge Gray 607×607×9 mm, szary, matowy	Nowoczesna płytka podłogowa w kolorze szarym o matowej powierzchni. Forma kwadratowa, mrozoodporna. Do prac wewnętrznych i zewnętrznych. Nowoczesny design idealny dla stylów architektonicznych.	140	\N	f	2025-09-09 15:16:34.61	2025-10-07 16:32:13.253	47fb589e-239a-4ae6-b82d-6232cc08a151	4b4a4dbd-1e2f-4a42-9ce3-eb9a4053e0d0
9176a99b-addc-40ac-a279-1c551f358446	Gres Atem Selin GRCM 600×600×9,5 mm, matowy	Uniwersalna płytka podłogowa o matowej powierzchni. Forma kwadratowa, mrozoodporna. Nadaje się do wnętrz i przestrzeni zewnętrznych. Wysokiej jakości gres doskonałej wytrzymałości.	140	\N	f	2025-09-09 15:16:34.6	2025-10-07 16:32:18.62	c664fd1e-5dfd-4239-a23e-60f28838f9a0	4b4a4dbd-1e2f-4a42-9ce3-eb9a4053e0d0
d34b9e37-a217-437b-aefd-c63554403f19	Gres Atem Zulu GRCM 600×600×9,5 mm, matowy	Uniwersalna płytka podłogowa o matowej powierzchni. Kwadratowa, mrozoodporna. Zastosowanie: wnętrza i na zewnątrz. Premium gres techniczny najwyższej jakości.	140	\N	f	2025-09-09 15:16:34.59	2025-10-07 16:32:22.991	cdec5f5c-e23c-4d8e-8a47-34a9caf21538	4b4a4dbd-1e2f-4a42-9ce3-eb9a4053e0d0
96c15ab2-a632-4eec-8712-789927b8f423	Gres Atem Zulu GRM 600×600×9,5 mm, matowy	Mrozoodporna płytka podłogowa o matowej powierzchni. Uniwersalna, kwadratowa, do pomieszczeń mieszkalnych i komercyjnych. Doskonała odporność na ścieranie i łatwość pielęgnacji.	140	\N	f	2025-09-09 15:16:34.582	2025-10-07 16:32:27.692	a18d0341-ea76-4998-97bc-631688fa7dc6	4b4a4dbd-1e2f-4a42-9ce3-eb9a4053e0d0
9b4c1940-02c9-48f2-886f-db73ac6deb93	Gres Atem Zulu BCM 600×600×9,5 mm, matowy	Płytka odporna na ścieranie z gresu technicznego. Podłogowa, mrozoodporna, kwadratowa. Do prac wewnętrznych i zewnętrznych. Wysoka wytrzymałość i doskonałe właściwości.	140	\N	f	2025-09-09 15:16:34.573	2025-10-07 16:32:32.202	5c2f4fc2-428e-4e83-81c7-86e2b1fe3dd9	4b4a4dbd-1e2f-4a42-9ce3-eb9a4053e0d0
069e087d-780c-41d8-a77a-44f1b8932c4d	Gres Atem Yankee GRCM 600×600×9,5 mm, beżowy, matowy	Wytrzymała płytka podłogowa o matowej powierzchni. Mrozoodporna, uniwersalna, do wnętrz i na zewnątrz. Wysokiej wytrzymałości gres techniczny klasy premium.	140	\N	f	2025-09-09 15:16:34.562	2025-10-07 16:32:36.565	ca19cbac-6282-4bdf-8bbd-45cd18b30d10	4b4a4dbd-1e2f-4a42-9ce3-eb9a4053e0d0
de142d0f-75f4-4a67-a34d-b76ac49c1078	Gres Atem Yankee BCM 600×600×9,5 mm, beżowy, matowy	Uniwersalna płytka podłogowa kwadratowa o matowej powierzchni, mrozoodporna. Do prac wewnętrznych i zewnętrznych. Klasa odporności na ścieranie PEI IV, nasiąkliwość poniżej 0,5%.	140	\N	f	2025-09-09 15:16:34.55	2025-10-07 16:32:40.493	b1ec4ccb-bd62-4edd-b317-957733d10188	4b4a4dbd-1e2f-4a42-9ce3-eb9a4053e0d0
d2d6041c-45fb-4b88-b1fc-884fd9c5947f	Gres Atem Yankee BM 600×600×9,5 mm, beżowy, matowy	Uniwersalna płytka z gresu technicznego. Nadaje się do pomieszczeń mieszkalnych i komercyjnych. Forma kwadratowa, mrozoodporna, klasa odporności na ścieranie PEI IV.	140	\N	f	2025-09-09 15:16:34.529	2025-10-07 16:32:47.056	8800467a-3af2-47f7-934d-d4eb7cac7309	4b4a4dbd-1e2f-4a42-9ce3-eb9a4053e0d0
540eea62-0f38-4e1e-93cc-06db53fd3a67	Керамограніт Atem Zulu GRM 600×600×9,5 мм, матовий	Морозостійка плитка для підлоги з матовою поверхнею. Універсальна, квадратна, для житлових і громадських приміщень. Відмінна зносостійкість та простота догляду.	1590	\N	f	2025-09-09 15:16:34.755	2025-10-07 16:34:27.706	a18d0341-ea76-4998-97bc-631688fa7dc6	262a0726-bc5e-4be1-a226-06656f13c1d6
f98f8c69-827b-4ac0-9a6a-a2a67eddacbe	Керамограніт Atem Zulu BCM 600×600×9,5 мм, матовий	Стійка до зносу плитка з технічного гресу. Підлогова, морозостійка, квадратна. Для внутрішніх і зовнішніх робіт. Висока міцність та відмінні властивості.	1590	\N	f	2025-09-09 15:16:34.713	2025-10-07 16:34:32.782	5c2f4fc2-428e-4e83-81c7-86e2b1fe3dd9	262a0726-bc5e-4be1-a226-06656f13c1d6
3eb2db13-16e8-4b7b-a2c9-19c223d9772e	Керамограніт Atem Yankee GRCM 600×600×9,5 мм, бежевий, матовий	Міцна підлогова плитка з матовою поверхнею. Морозостійка, універсальна, для інтер'єру та екстер'єру. Високоміцний технічний керамограніт преміум класу.	1590	\N	f	2025-09-09 15:16:34.678	2025-10-07 16:34:36.314	ca19cbac-6282-4bdf-8bbd-45cd18b30d10	262a0726-bc5e-4be1-a226-06656f13c1d6
59d2d6eb-457a-4492-aef1-aec6aae5fdb6	Керамограніт Atem Yankee BCM 600×600×9,5 мм, бежевий, матовий	Універсальна підлогова плитка квадратної форми з матовою поверхнею, морозостійка. Для внутрішніх і зовнішніх робіт. Клас зносостійкості PEI IV, водопоглинання менше 0,5%.	1590	\N	f	2025-09-09 15:16:34.656	2025-10-07 16:34:40.555	b1ec4ccb-bd62-4edd-b317-957733d10188	262a0726-bc5e-4be1-a226-06656f13c1d6
284edc0f-8db5-4d43-a5b5-05441d08418a	Керамограніт Atem Yankee BM 600×600×9,5 мм, бежевий, матовий	Універсальна плитка з технічного гресу. Підходить для житлових і громадських приміщень. Квадратна форма, морозостійка, клас зносостійкості PEI IV.	1590	\N	f	2025-09-09 15:16:34.648	2025-10-07 16:34:45.004	8800467a-3af2-47f7-934d-d4eb7cac7309	262a0726-bc5e-4be1-a226-06656f13c1d6
9809b8f7-cd00-4b4e-b8ae-f392a3ea7f8c	Керамограніт Atem Space Stone Black 595×595×9 мм, чорний, матовий	Стильна універсальна плитка чорного кольору з матовою поверхнею. Квадратна форма, морозостійка. Для інтер'єру та екстер'єру. Сучасний дизайн з текстурою каменю та виняткової міцності.	1590	\N	f	2025-09-09 15:16:34.857	2025-10-07 16:34:09.686	a7989629-41df-46b3-a90a-de1d5435263f	262a0726-bc5e-4be1-a226-06656f13c1d6
77be5b1e-270b-496a-a439-87c31a9f5f6a	Керамограніт Atem Space Stone 595×595×9 мм, сірий, матовий	Універсальна плитка для підлоги з матовою поверхнею. Квадратна форма, морозостійка. Ідеальна для сучасних інтер'єрів з виглядом натурального каменю та відмінними технічними властивостями.	1590	\N	f	2025-09-09 15:16:34.848	2025-10-07 16:34:13.598	d314b6ef-079e-4548-a51f-5c9b74ee8b3b	262a0726-bc5e-4be1-a226-06656f13c1d6
4a554b06-ce4e-4466-9d10-ed0ed2d4b3d3	Керамограніт Atem Hygge Gray 607×607×9 мм, сірий, матовий	Сучасна підлогова плитка сірого кольору з матовою поверхнею. Квадратна форма, морозостійка. Для внутрішніх та зовнішніх робіт. Сучасний дизайн ідеальний для архітектурних стилів.	1590	\N	f	2025-09-09 15:16:34.838	2025-10-07 16:34:16.587	47fb589e-239a-4ae6-b82d-6232cc08a151	262a0726-bc5e-4be1-a226-06656f13c1d6
2b1a34bf-01d1-4a1c-82a0-d7806a44389f	Керамограніт Atem Selin GRCM 600×600×9,5 мм, матовий	Універсальна підлогова плитка з матовою поверхнею. Квадратна форма, морозостійка. Підходить для інтер'єрів та зовнішніх просторів. Високоякісний керамограніт відмінної міцності.	1590	\N	f	2025-09-09 15:16:34.828	2025-10-07 16:34:21.323	c664fd1e-5dfd-4239-a23e-60f28838f9a0	262a0726-bc5e-4be1-a226-06656f13c1d6
56b868fe-2b41-4fd1-b1d0-e990c9e09683	Керамогранит Atem Hygge Gray 607×607×9 мм, серый, матовый	Современная напольная плитка серого цвета с матовой поверхностью. Квадратная форма, морозостойкая. Для внутренних и наружных работ. Современный дизайн идеальный для архитектурных стилей.	3155	\N	f	2025-09-09 15:16:35.086	2025-10-07 16:35:21.437	47fb589e-239a-4ae6-b82d-6232cc08a151	986c6d95-c491-4211-b7ca-86d0b5e24b6c
42fe45eb-b5cf-4d34-92df-3f87d7d6a98e	Керамогранит Atem Selin GRCM 600×600×9,5 мм, матовый	Универсальная напольная плитка с матовой поверхностью. Квадратная форма, морозостойкая. Подходит для интерьеров и внешних пространств. Высококачественный керамогранит отличной прочности.	3155	\N	f	2025-09-09 15:16:35.077	2025-10-07 16:35:25.036	c664fd1e-5dfd-4239-a23e-60f28838f9a0	986c6d95-c491-4211-b7ca-86d0b5e24b6c
10762310-2ac4-4b65-b483-e7eeed2d4ba9	Керамогранит Atem Zulu GRCM 600×600×9,5 мм, матовый	Универсальная плитка для пола с матовой поверхностью. Квадратная, морозостойкая. Применение: интерьер и экстерьер. Премиальный технический керамогранит высшего качества.	3155	\N	f	2025-09-09 15:16:35.056	2025-10-07 16:35:28.047	cdec5f5c-e23c-4d8e-8a47-34a9caf21538	986c6d95-c491-4211-b7ca-86d0b5e24b6c
6f070b19-c99f-4d64-b21b-b0673cf75345	Керамогранит Atem Zulu GRM 600×600×9,5 мм, матовый	Морозостойкая плитка для пола с матовой поверхностью. Универсальная, квадратная, для жилых и общественных помещений. Отличная износостойкость и простота ухода.	3155	\N	f	2025-09-09 15:16:35.026	2025-10-07 16:35:31.574	a18d0341-ea76-4998-97bc-631688fa7dc6	986c6d95-c491-4211-b7ca-86d0b5e24b6c
1bd6df34-b558-45db-9bd6-6e848eff805e	Керамогранит Atem Zulu BCM 600×600×9,5 мм, матовый	Стойкая к износу плитка из технического гранита. Напольная, морозостойкая, квадратная. Для внутренних и наружных работ. Высокая прочность и отличные свойства.	3155	\N	f	2025-09-09 15:16:35	2025-10-07 16:35:34.708	5c2f4fc2-428e-4e83-81c7-86e2b1fe3dd9	986c6d95-c491-4211-b7ca-86d0b5e24b6c
83edf8de-f606-42d7-9a08-1445a446d62c	Керамогранит Atem Yankee GRCM 600×600×9,5 мм, бежевый, матовый	Прочная напольная плитка с матовой поверхностью. Морозостойкая, универсальная, для интерьера и экстерьера. Высокопрочный технический керамогранит премиум класса.	3155	\N	f	2025-09-09 15:16:34.974	2025-10-07 16:35:38.252	ca19cbac-6282-4bdf-8bbd-45cd18b30d10	986c6d95-c491-4211-b7ca-86d0b5e24b6c
0a4b2875-9bcc-43ce-85ec-475039fbf1cd	Керамогранит Atem Yankee BCM 600×600×9,5 мм, бежевый, матовый	Универсальная напольная плитка квадратной формы с матовой поверхностью, морозостойкая. Для внутренних и наружных работ. Класс износостойкости PEI IV, водопоглощение менее 0,5%.	3155	\N	f	2025-09-09 15:16:34.936	2025-10-07 16:35:41.127	b1ec4ccb-bd62-4edd-b317-957733d10188	986c6d95-c491-4211-b7ca-86d0b5e24b6c
f48394d3-8189-4501-b9e4-9e332f7d87a2	Керамогранит Atem Yankee BM 600×600×9,5 мм, бежевый, матовый	Универсальная плитка из технического гранита. Подходит для жилых и общественных помещений. Квадратная форма, морозостойкая, класс износостойкости PEI IV.	3155	\N	f	2025-09-09 15:16:34.892	2025-10-07 16:35:45.386	8800467a-3af2-47f7-934d-d4eb7cac7309	986c6d95-c491-4211-b7ca-86d0b5e24b6c
3f382861-1cae-4eff-920f-ee6b9327fb6d	Gres Golden Tile Meloren 595×595×9 mm, matowy / gładki	Uniwersalna płytka podłogowa o matowej powierzchni. Mrozoodporna, kwadratowa, nadaje się do różnego typu pomieszczeń. Wysokiej jakości gres z doskonałą odpornością na ścieranie i łatwością pielęgnacji.	140	\N	f	2025-09-09 15:16:34.639	2025-10-07 16:31:54.986	0ddd26d3-b365-4d77-9063-e3246954c29d	4b4a4dbd-1e2f-4a42-9ce3-eb9a4053e0d0
10aa3969-c8a7-4216-bc40-1b90ce706b87	Керамограніт Golden Tile Meloren 595×595×9 мм, матовий/глянцевий	Підлогова універсальна плитка з матовою поверхнею. Морозостійка, квадратна, підходить для будь-яких приміщень. Високоякісний керамограніт з відмінною зносостійкістю та простотою догляду.	1590	\N	f	2025-09-09 15:16:34.875	2025-10-07 16:34:03.573	0ddd26d3-b365-4d77-9063-e3246954c29d	262a0726-bc5e-4be1-a226-06656f13c1d6
d60fdb31-8202-4ce5-afd4-6a004c05a351	Керамогранит Atem Space Stone Black 595×595×9 мм, черный, матовый	Стильная универсальная плитка черного цвета с матовой поверхностью. Квадратная форма, морозостойкая. Для интерьера и экстерьера. Современный дизайн с текстурой камня и исключительной прочностью.	3155	\N	f	2025-09-09 15:16:35.103	2025-10-07 16:35:15.32	a7989629-41df-46b3-a90a-de1d5435263f	986c6d95-c491-4211-b7ca-86d0b5e24b6c
be3a5acb-b68b-49f6-8c15-b2235a261a17	Керамогранит Atem Space Stone 595×595×9 мм, серый, матовый	Универсальная плитка для пола с матовой поверхностью. Квадратная форма, морозостойкая. Идеальная для современных интерьеров с видом натурального камня и отличными техническими свойствами.	3155	\N	f	2025-09-09 15:16:35.094	2025-10-07 16:35:18.711	d314b6ef-079e-4548-a51f-5c9b74ee8b3b	986c6d95-c491-4211-b7ca-86d0b5e24b6c
18ffc472-04b0-45ca-a31e-c8f55c2a498c	Golden Tile Meloren Porcelain Stoneware 595×595×9mm, Matte / Glossy	Universal floor tile with matte surface finish. Frost-resistant, square format suitable for any room type. High-quality porcelain stoneware with excellent wear resistance and low maintenance.	28.59	\N	f	2025-09-09 15:16:35.26	2025-10-07 16:36:12.884	0ddd26d3-b365-4d77-9063-e3246954c29d	28111d33-d269-4ded-a7d8-245fdf115023
0e74ce0e-dee2-4765-bda7-e8431a036b6b	Atem Space Stone Black Porcelain Stoneware 595×595×9mm, Black, Matte	Stylish universal black tile with matte finish. Square format, frost-resistant. For interior and exterior use. Contemporary design with stone texture and exceptional durability.	28.59	\N	f	2025-09-09 15:16:35.248	2025-10-07 16:36:16.296	a7989629-41df-46b3-a90a-de1d5435263f	28111d33-d269-4ded-a7d8-245fdf115023
87667b62-4d46-42d8-bafe-d711fc96cf61	Atem Space Stone Porcelain Stoneware 595×595×9mm, Grey, Matte	Universal floor tile with matte surface finish. Square format, frost-resistant. Ideal for contemporary interiors with stone-like appearance and excellent technical properties.	28.59	\N	f	2025-09-09 15:16:35.237	2025-10-07 16:36:19.526	d314b6ef-079e-4548-a51f-5c9b74ee8b3b	28111d33-d269-4ded-a7d8-245fdf115023
4cf5bb4a-3c8a-46c1-b43c-c21dc5e3223c	Atem Hygge Gray Porcelain Stoneware 607×607×9mm, Grey, Matte	Modern grey floor tile with matte finish. Square format, frost-resistant. For interior and exterior applications. Contemporary design perfect for modern architectural styles.	28.59	\N	f	2025-09-09 15:16:35.223	2025-10-07 16:36:22.116	47fb589e-239a-4ae6-b82d-6232cc08a151	28111d33-d269-4ded-a7d8-245fdf115023
c2ad5e51-6e17-4bfb-898b-28518ee4ca88	Atem Selin GRCM Porcelain Stoneware 600×600×9.5mm, Matte	Universal floor tile with matte surface finish. Square format, frost-resistant. Suitable for interiors and exterior spaces. High-quality porcelain stoneware with excellent durability.	28.59	\N	f	2025-09-09 15:16:35.21	2025-10-07 16:36:25.647	c664fd1e-5dfd-4239-a23e-60f28838f9a0	28111d33-d269-4ded-a7d8-245fdf115023
cd504792-95d0-4654-b357-4206b909b3d7	Atem Zulu GRCM Porcelain Stoneware 600×600×9.5mm, Matte	Universal floor tile with matte finish. Square format, frost-resistant. Applications include interior and exterior spaces. Premium quality technical porcelain with superior durability.	28.59	\N	f	2025-09-09 15:16:35.198	2025-10-07 16:36:28.281	cdec5f5c-e23c-4d8e-8a47-34a9caf21538	28111d33-d269-4ded-a7d8-245fdf115023
ddc1ea1d-9aba-414e-a88a-6588f323c747	Atem Zulu GRM Porcelain Stoneware 600×600×9.5mm, Matte	Frost-resistant floor tile with matte surface. Universal, square format for residential and commercial spaces. Excellent wear resistance and low maintenance requirements.	28.59	\N	f	2025-09-09 15:16:35.188	2025-10-07 16:36:31.412	a18d0341-ea76-4998-97bc-631688fa7dc6	28111d33-d269-4ded-a7d8-245fdf115023
e04c2799-4ed0-48cf-90bf-f412015e2331	Atem Zulu BCM Porcelain Stoneware 600×600×9.5mm, Matte	Wear-resistant technical porcelain tile. Floor tile, frost-resistant, square format. For interior and exterior applications. High durability and excellent technical properties.	28.59	\N	f	2025-09-09 15:16:35.178	2025-10-07 16:36:34.264	5c2f4fc2-428e-4e83-81c7-86e2b1fe3dd9	28111d33-d269-4ded-a7d8-245fdf115023
86c23faf-cbd5-47a5-8ba6-4eb3d17b81f3	Atem Yankee GRCM Porcelain Stoneware 600×600×9.5mm, Beige, Matte	Durable floor tile with matte surface. Frost-resistant, universal application for interior and exterior use. High-quality technical porcelain with superior strength characteristics.	28.59	\N	f	2025-09-09 15:16:35.167	2025-10-07 16:36:37.564	ca19cbac-6282-4bdf-8bbd-45cd18b30d10	28111d33-d269-4ded-a7d8-245fdf115023
1570f4bc-548f-412e-addd-4c9490e32a74	Atem Yankee BCM Porcelain Stoneware 600×600×9.5mm, Beige, Matte	Premium porcelain stoneware with matte surface finish. Frost-resistant technical porcelain, perfect for floors in any room. Features excellent durability and water resistance with PEI IV wear resistance class.	28.59	\N	f	2025-09-09 15:16:35.157	2025-10-07 16:36:40.426	b1ec4ccb-bd62-4edd-b317-957733d10188	28111d33-d269-4ded-a7d8-245fdf115023
8af915d9-7af2-49d5-b69a-049403e39ed0	Atem Yankee BM Porcelain Stoneware 600×600×9.5mm, Beige, Matte	Universal technical porcelain tile with matte finish. Square format, frost-resistant, suitable for residential and commercial spaces. Excellent technical characteristics and high wear resistance.	28.59	\N	f	2025-09-09 15:16:35.148	2025-10-07 16:37:14.937	8800467a-3af2-47f7-934d-d4eb7cac7309	28111d33-d269-4ded-a7d8-245fdf115023
f384ab2a-2462-4a4e-b4fc-c1f8e0a39759	Керамограніт Atem Zulu GRCM 600×600×9,5 мм, матовий	Універсальна плитка для підлоги з матовою поверхнею. Квадратна, морозостійка. Застосування: інтер'єр і екстер'єр. Преміальний технічний керамограніт найвищої якості.	1590	\N	f	2025-09-09 15:16:34.784	2025-10-07 16:34:24.101	cdec5f5c-e23c-4d8e-8a47-34a9caf21538	262a0726-bc5e-4be1-a226-06656f13c1d6
87282ec0-a75d-445e-b10b-28a5c0b5fc8f	Керамогранит Golden Tile Meloren 595×595×9 мм, матовый / глянцевий	Напольная универсальная плитка с матовой поверхностью. Морозостойкая, квадратная, подходит для любых помещений. Высококачественный керамогранит с отличной износостойкостью и простотой ухода.	3155	\N	f	2025-09-09 15:16:35.125	2025-10-07 16:35:12.285	0ddd26d3-b365-4d77-9063-e3246954c29d	986c6d95-c491-4211-b7ca-86d0b5e24b6c
\.


--
-- Data for Name: local_services; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.local_services (id, name, description, price, discount_price, is_excluded, created, updated, service_id, locale_id) FROM stdin;
\.


--
-- Data for Name: locales; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.locales (id, name, language, symbol, currency, currency_symbol, phone_code, image, is_excluded, created, updated) FROM stdin;
4b4a4dbd-1e2f-4a42-9ce3-eb9a4053e0d0	Poland	Polski	PL	PLN	zł	+48	/static/locales/PL.webp	f	2025-08-09 14:22:33.467	2025-08-09 14:22:33.467
262a0726-bc5e-4be1-a226-06656f13c1d6	Ukraine	Українська	UA	UAH	₴	+380	/static/locales/UA.webp	f	2025-08-09 14:22:33.467	2025-08-09 14:22:33.467
986c6d95-c491-4211-b7ca-86d0b5e24b6c	Russia	Русский	RU	RUB	₽	+7	/static/locales/RU.webp	f	2025-08-09 14:22:33.467	2025-08-09 14:22:33.467
28111d33-d269-4ded-a7d8-245fdf115023	United Kingdom	English	UK	GBP	£	+44	/static/locales/GB.webp	f	2025-08-09 14:22:33.467	2025-09-09 15:07:17.909
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, description, image, "price_USD", "discount_price_USD", is_excluded, created, updated, category_id) FROM stdin;
8800467a-3af2-47f7-934d-d4eb7cac7309	Керамограніт Atem Yankee BM 600×600×9,5 мм, бежевий, матовий	Керамограніт Atem Yankee BM 600×600×9,5 мм, бежевий, матовий\r\nУніверсальна підлогова плитка, квадратна форма, матова поверхня, морозостійка. Для внутрішніх і зовнішніх робіт. Упаковка: 5 шт. (1,8 м²), вага 30 кг.	http://localhost:3001/static/products/product_1757407089045_yankee-bm-s.webp	12	\N	f	2025-09-09 08:38:09.053	2025-09-09 08:58:55.182	30a7b5ba-6ae8-4fd5-a87a-fcebc5c18524
d314b6ef-079e-4548-a51f-5c9b74ee8b3b	Керамограніт Atem Space Stone 595×595×9 мм, сірий, матовий	Універсальна плитка для підлоги. Матова поверхня, квадратна форма, морозостійка. Ідеальна для сучасних інтер’єрів. Упаковка: 4 шт. (≈1,41 м²), вага 28 кг.	http://146.103.122.171:3001/static/products/product_1757409477000_space-stone.webp	38.43	\N	f	2025-09-09 09:17:57.004	2025-10-07 16:37:48.924	30a7b5ba-6ae8-4fd5-a87a-fcebc5c18524
47fb589e-239a-4ae6-b82d-6232cc08a151	Керамограніт Atem Hygge Gray 607×607×9 мм, сірий, матовий	Сучасна підлогова плитка сірого кольору. Квадратна форма, матова поверхня, морозостійка. Для внутрішніх та зовнішніх робіт. Упаковка: 4 шт. (≈1,48 м²), вага 27 кг.	http://146.103.122.171:3001/static/products/product_1757409417494_hygge-gray.jpg	38.43	\N	f	2025-09-09 09:16:57.501	2025-10-07 16:37:55.564	30a7b5ba-6ae8-4fd5-a87a-fcebc5c18524
c664fd1e-5dfd-4239-a23e-60f28838f9a0	Керамограніт Atem Selin GRCM 600×600×9,5 мм, матовий	Підлогова плитка з технічного гресу. Морозостійка, універсальна, квадратна форма. Ідеальна для житлових та громадських приміщень. Упаковка: 5 шт. (1,8 м²), вага 30 кг.	http://localhost:3001/static/products/product_1757409208382_selin-_-s.jpg	38.43	\N	f	2025-09-09 09:13:28.387	2025-10-07 16:38:03.272	30a7b5ba-6ae8-4fd5-a87a-fcebc5c18524
cdec5f5c-e23c-4d8e-8a47-34a9caf21538	Керамограніт Atem Zulu GRCM 600×600×9,5 мм, матовий	Універсальна плитка для підлоги. Матова, квадратна, морозостійка. Використання: інтер’єр і екстер’єр. Упаковка: 5 шт. (1,8 м²), вага 30 кг.	http://146.103.122.171:3001/static/products/product_1757409108047_zulu-grcm.jpg	38.43	\N	f	2025-09-09 09:11:48.05	2025-10-07 16:38:09.225	30a7b5ba-6ae8-4fd5-a87a-fcebc5c18524
a18d0341-ea76-4998-97bc-631688fa7dc6	Керамограніт Atem Zulu GRM 600×600×9,5 мм, матовий	Морозостійка плитка для підлоги. Універсальна, квадратна, матова поверхня. Для житлових і громадських приміщень. Упаковка: 5 шт. (1,8 м²), вага 30 кг.	http://146.103.122.171:3001/static/products/product_1757408970653_zulu-grm.webp	38.43	\N	f	2025-09-09 09:09:30.658	2025-10-07 16:38:15.502	30a7b5ba-6ae8-4fd5-a87a-fcebc5c18524
5c2f4fc2-428e-4e83-81c7-86e2b1fe3dd9	Керамограніт Atem Zulu BCM 600×600×9,5 мм, сірий, матовий	Підлогова універсальна плитка. Морозостійка, квадратна форма, матова поверхня. Підходить для житлових і комерційних зон. Упаковка: 5 шт. (1,8 м²), вага 30 кг.	http://146.103.122.171:3001/static/products/product_1757408849300_zulu-bcm-s.jpg	38.43	\N	f	2025-09-09 09:07:29.305	2025-10-07 16:38:22.889	30a7b5ba-6ae8-4fd5-a87a-fcebc5c18524
ca19cbac-6282-4bdf-8bbd-45cd18b30d10	Керамограніт Atem Yankee GRCM 600×600×9,5 мм, бежевий, матовий	Міцна підлогова плитка з матовою поверхнею. Морозостійка, універсальна, для інтер’єру та екстер’єру. Упаковка: 5 шт. (1,8 м²), вага 30 кг.	http://146.103.122.171:3001/static/products/product_1757408708454_yankee-grcm.jpg	38.43	\N	f	2025-09-09 09:05:08.46	2025-10-07 16:38:30.438	30a7b5ba-6ae8-4fd5-a87a-fcebc5c18524
b1ec4ccb-bd62-4edd-b317-957733d10188	Керамограніт Atem Yankee BCM 600×600×9,5 мм, бежевий, матовий	Універсальна підлогова плитка, квадратна форма, матова поверхня, морозостійка. Для внутрішніх і зовнішніх робіт. Упаковка: 5 шт. (1,8 м²), вага 30 кг.	http://146.103.122.171:3001/static/products/product_1757408635357_yankee-bcm-s.webp	38.43	\N	f	2025-09-09 09:03:55.364	2025-10-07 16:38:37.558	30a7b5ba-6ae8-4fd5-a87a-fcebc5c18524
0ddd26d3-b365-4d77-9063-e3246954c29d	Керамограніт Golden Tile Meloren 595×595 мм, матовий/глянцевий	Керамогранітна плитка Meloren від українського виробника Golden Tile поєднує елегантний дизайн, високу зносостійкість та універсальність у використанні. Вона ідеально підходить для облаштування підлог у різноманітних приміщеннях, додаючи інтер'єру стильного та сучасного вигляду.	http://146.103.122.171:3001/static/products/product_1757410297315_golden-tile-meloren.jpg	38.43	\N	f	2025-09-09 09:31:37.321	2025-10-07 16:37:35.245	30a7b5ba-6ae8-4fd5-a87a-fcebc5c18524
a7989629-41df-46b3-a90a-de1d5435263f	Керамограніт Atem Space Stone Black 595×595×9 мм, чорний, матовий	Стильна універсальна плитка чорного кольору. Матова поверхня, квадратна форма, морозостійка. Для інтер’єру та екстер’єру. Упаковка: 4 шт. (≈1,41 м²), вага 28 кг.	http://146.103.122.171:3001/static/products/product_1757409770430_space-stone-black.jpg	38.43	\N	f	2025-09-09 09:22:50.455	2025-10-07 16:37:40.335	30a7b5ba-6ae8-4fd5-a87a-fcebc5c18524
\.


--
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.services (id, name, description, image, "price_USD", "discount_price_USD", is_excluded, created, updated, category_id) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, hashed_password, first_name, last_name, phone_number, image, created, updated, role, is_banned, locale_id) FROM stdin;
4fcac5f2-a0d4-4833-aab5-8b7ac12f6ffe	admin@gmail.com	$argon2id$v=19$m=65536,t=3,p=4$wJEZfO8aybuwV4N9dj9rLA$l9LWUwckHJNX+/S0AwrosSwyqFuEcP/RbXuP1xvvQNc	Admin	Admin	\N	\N	2025-08-09 14:22:33.459	2025-08-09 14:22:33.459	ADMIN	f	\N
\.


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: forms forms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forms
    ADD CONSTRAINT forms_pkey PRIMARY KEY (id);


--
-- Name: item_images item_images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_images
    ADD CONSTRAINT item_images_pkey PRIMARY KEY (id);


--
-- Name: local_categories local_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.local_categories
    ADD CONSTRAINT local_categories_pkey PRIMARY KEY (id);


--
-- Name: local_item_descriptions local_item_descriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.local_item_descriptions
    ADD CONSTRAINT local_item_descriptions_pkey PRIMARY KEY (id);


--
-- Name: local_products local_products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.local_products
    ADD CONSTRAINT local_products_pkey PRIMARY KEY (id);


--
-- Name: local_services local_services_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.local_services
    ADD CONSTRAINT local_services_pkey PRIMARY KEY (id);


--
-- Name: locales locales_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locales
    ADD CONSTRAINT locales_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: locales_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX locales_name_key ON public.locales USING btree (name);


--
-- Name: locales_symbol_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX locales_symbol_key ON public.locales USING btree (symbol);


--
-- Name: products_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX products_name_key ON public.products USING btree (name);


--
-- Name: services_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX services_name_key ON public.services USING btree (name);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: users_phone_number_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_phone_number_key ON public.users USING btree (phone_number);


--
-- Name: categories categories_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: forms forms_locale_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forms
    ADD CONSTRAINT forms_locale_id_fkey FOREIGN KEY (locale_id) REFERENCES public.locales(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: item_images item_images_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_images
    ADD CONSTRAINT item_images_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: item_images item_images_service_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_images
    ADD CONSTRAINT item_images_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.services(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: local_categories local_categories_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.local_categories
    ADD CONSTRAINT local_categories_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: local_categories local_categories_locale_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.local_categories
    ADD CONSTRAINT local_categories_locale_id_fkey FOREIGN KEY (locale_id) REFERENCES public.locales(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: local_item_descriptions local_item_descriptions_local_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.local_item_descriptions
    ADD CONSTRAINT local_item_descriptions_local_product_id_fkey FOREIGN KEY (local_product_id) REFERENCES public.local_products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: local_item_descriptions local_item_descriptions_local_service_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.local_item_descriptions
    ADD CONSTRAINT local_item_descriptions_local_service_id_fkey FOREIGN KEY (local_service_id) REFERENCES public.local_services(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: local_products local_products_locale_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.local_products
    ADD CONSTRAINT local_products_locale_id_fkey FOREIGN KEY (locale_id) REFERENCES public.locales(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: local_products local_products_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.local_products
    ADD CONSTRAINT local_products_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: local_services local_services_locale_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.local_services
    ADD CONSTRAINT local_services_locale_id_fkey FOREIGN KEY (locale_id) REFERENCES public.locales(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: local_services local_services_service_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.local_services
    ADD CONSTRAINT local_services_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.services(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: products products_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: services services_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users users_locale_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_locale_id_fkey FOREIGN KEY (locale_id) REFERENCES public.locales(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

