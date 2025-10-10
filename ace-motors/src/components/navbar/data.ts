export const vehicles = [
  {
    label: "Velocity ZR",
    id: "velocity-zr",
    type: "bike",
    image: "/images/harley.avif",
    startingPrice: 1800,
  },
  {
    label: "Thunder X9",
    id: "thunder-x9",
    type: "bike",
    image:
      "https://images.unsplash.com/photo-1622185135505-2d795003994a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    startingPrice: 2100,
  },
  {
    label: "Aurora GT",
    id: "aurora-gt",
    type: "car",
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    startingPrice: 28000,
  },
  {
    label: "Phantom RS",
    id: "phantom-rs",
    type: "car",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    startingPrice: 34000,
  },
];
export const sections = [
  {
    label: "Visit",
    href: "/visit",
    images: [
      {
        url: "https://plus.unsplash.com/premium_photo-1661393519414-58bbeebe688e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Book Appointment",
        href: "/visit?to=appointment",
      },
      {
        url: "https://images.unsplash.com/photo-1521410843026-323be9ead002?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Schedule Test Drive",
        href: "/visit?to=test-drive",
      },
    ],
    links: {
      heading: "Explore Options",
      urls: [
        { label: "Book Appointment", href: "/visit?to=appointment" },
        { label: "Find Dealership", href: "/visit?to=dealership" },
        { label: "Test Drive Locations", href: "/visit?to=test-drive" },
      ],
    },
  },
  {
    label: "Charging Stations",
    href: "/charging",
    images: [
      {
        url: "https://plus.unsplash.com/premium_photo-1715639312136-56a01f236440?q=80&w=1157&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Charging Network",
        href: "/charging",
      },
      {
        url: "https://images.unsplash.com/photo-1666919643134-d97687c1826c?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Fast Charging Points",
        href: "/charging?type=fast",
      },
    ],
    links: {
      heading: "Available Stations",
      urls: [
        {
          label: "Kathmandu EV Hub",
          href: "https://www.google.com/maps?q=Kathmandu+EV+Charging+Hub",
        },
        {
          label: "Pokhara Lakeside Station",
          href: "https://www.google.com/maps?q=Pokhara+EV+Charging+Station",
        },
        {
          label: "Chitwan FastCharge Center",
          href: "https://www.google.com/maps?q=Chitwan+EV+Charging+Center",
        },
      ],
    },
  },
  {
    label: "Our Services",
    href: "/service",
    images: [
      {
        url: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Maintenance & Repairs",
        href: "/service?type=maintenance",
      },
      {
        url: "https://plus.unsplash.com/premium_photo-1661306409866-18a31687d71b?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Roadside Assistance",
        href: "/service?type=assistance",
      },
    ],
    links: {
      heading: "Available Services",
      urls: [
        { label: "General Maintenance", href: "/service?type=maintenance" },
        { label: "Engine Diagnostics", href: "/service?type=diagnostics" },
        { label: "Battery Replacement", href: "/service?type=battery" },
        { label: "Emergency Pickup", href: "/service?type=pickup" },
      ],
    },
  },
];

export type VechilePreviewNavigatorProps = (typeof vehicles)[number];
export type SectionPreviewNavigatorProps = (typeof sections)[number];
