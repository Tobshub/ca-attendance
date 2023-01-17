export {};

declare global {
  interface CAWorkerRef {
    id: string;
    name: string;
    email: string;
  }

  interface CAWorker extends CAWorkerRef {
    appearances: number;
    department: string;
  }

  // church departments
  interface Department {
    Ushering: "Ushering";
    Choir: "Choir";
    Technical: "Technical";
    Prayer: "Prayer";
    Sanitation: "Sanitation";
  }

  interface ChurchDay {
    date: number;
    presentWorker: CAWorkerRef[];
  }
}
