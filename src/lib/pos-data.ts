import tortillasImg from "@/assets/tortillas.jpg";
import aguaImg from "@/assets/agua-aromatica.jpg";
import pizzaImg from "@/assets/pizza.jpg";
import hamburguesaImg from "@/assets/hamburguesa.jpg";
import contenedorImg from "@/assets/contenedor.jpg";

export type Category = "Contenedores" | "Fast Food" | "Pizzas" | "Tradicional";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
}

export interface TicketLine {
  id: string;
  name: string;
  unitPrice: number;
  qty: number;
  image: string;
  note?: string;
  discountPercent?: number;
}

export const CATEGORIES: Category[] = [
  "Contenedores",
  "Fast Food",
  "Pizzas",
  "Tradicional",
];

export const PRODUCTS: Product[] = [
  {
    id: "tortillas-7",
    name: "7 Tortillas de Tiesto",
    price: 2.0,
    category: "Tradicional",
    image: tortillasImg,
  },
  {
    id: "agua-aromatica",
    name: "Agua Aromática de Hierba Luisa",
    price: 1.0,
    category: "Tradicional",
    image: aguaImg,
  },
  {
    id: "pizza-personal",
    name: "Pizza Personal Pepperoni",
    price: 5.5,
    category: "Pizzas",
    image: pizzaImg,
  },
  {
    id: "hamburguesa-especial",
    name: "Hamburguesa Especial",
    price: 4.25,
    category: "Fast Food",
    image: hamburguesaImg,
  },
  {
    id: "contenedor-combinado",
    name: "Contenedor con Combinado del Día",
    price: 6.0,
    category: "Contenedores",
    image: contenedorImg,
  },
  {
    id: "tortillas-docena",
    name: "Docena de Tortillas de Tiesto",
    price: 3.5,
    category: "Tradicional",
    image: tortillasImg,
  },
  {
    id: "pizza-familiar",
    name: "Pizza Familiar Suprema",
    price: 9.9,
    category: "Pizzas",
    image: pizzaImg,
  },
  {
    id: "combo-hamburguesa",
    name: "Combo Hamburguesa + Gaseosa",
    price: 5.75,
    category: "Fast Food",
    image: hamburguesaImg,
  },
];

export const CUSTOMER = "CONSUMIDOR FINAL";

export const money = (n: number) => `$${n.toFixed(2)}`;

export const ticketLineTotal = (line: TicketLine) => {
  const discount = line.discountPercent ?? 0;
  return line.qty * line.unitPrice * (1 - discount / 100);
};
