export const bikesData = [
  {
    slug: "harley-street-750",
    name: "Harley Street 750",
    mileage: "20 km/l",
    colors: [
      { name: "Black", code: "#000000" },
      { name: "Silver", code: "#C0C0C0" },
    ],
    images: ["/images/harley.avif", "/images/harley-silver.avif"],
    baseFeatures: [
      {
        fuelTankCapacity: "13.1 L",
        engine: "749cc, Liquid-cooled, 47 HP",
        torque: "59 Nm",
        make: "2025",
      },
    ],
    variants: [
      {
        name: "Standard",
        price: 1200000,
        image: "/images/harley.avif",
        features: [
          "LED Headlamp",
          "ABS Dual Channel",
          "Digital Console",
          "Tubeless Tyres",
          "6-Speed Gearbox",
        ],
      },
      {
        name: "Custom Edition",
        price: 1350000,
        image: "/images/harley-silver.avif",
        features: [
          "Matte Paint Finish",
          "Premium Seat Cover",
          "Chrome Exhaust",
          "Navigation Display",
          "Bluetooth Connectivity",
        ],
      },
    ],
    notes: ["A modern urban cruiser with classic Harley style."],
  },
  {
    slug: "yamaha-r15-v4",
    name: "Yamaha R15 V4",
    mileage: "45 km/l",
    colors: [
      { name: "Racing Blue", code: "#0033CC" },
      { name: "Dark Knight", code: "#111111" },
    ],
    images: ["/images/harley.avif", "/images/harley-silver.avif"],
    baseFeatures: [
      {
        fuelTankCapacity: "11 L",
        engine: "155cc, Liquid-cooled, 18.4 HP",
        torque: "14.2 Nm",
        make: "2025",
      },
    ],
    variants: [
      {
        name: "Standard",
        price: 520000,
        image: "/images/harley.avif",
        features: [
          "Quick Shifter",
          "Assist & Slipper Clutch",
          "LED Headlight",
          "Traction Control",
          "Digital LCD Console",
        ],
      },
      {
        name: "M Version",
        price: 580000,
        image: "/images/harley-silver.avif",
        features: [
          "Bluetooth Y-Connect",
          "ABS Dual Channel",
          "Premium Body Graphics",
          "Sport Riding Modes",
          "Aluminium Swing Arm",
        ],
      },
    ],
    notes: ["Track-inspired performance with great mileage."],
  },
  {
    slug: "kawasaki-ninja-400",
    name: "Kawasaki Ninja 400",
    mileage: "25 km/l",
    colors: [
      { name: "Lime Green", code: "#32CD32" },
      { name: "Black", code: "#000000" },
    ],
    images: ["/images/harley.avif", "/images/harley-silver.avif"],
    baseFeatures: [
      {
        fuelTankCapacity: "14 L",
        engine: "399cc, Parallel Twin, 47 HP",
        torque: "38 Nm",
        make: "2025",
      },
    ],
    variants: [
      {
        name: "Standard",
        price: 1500000,
        image: "/images/harley.avif",
        features: [
          "LED Tail Lamp",
          "Dual Disc Brakes",
          "Sport Suspension",
          "Digital Speedometer",
          "Assist & Slipper Clutch",
        ],
      },
      {
        name: "ABS Edition",
        price: 1620000,
        image: "/images/harley-silver.avif",
        features: [
          "Dual Channel ABS",
          "Sport Fairing",
          "Lightweight Trellis Frame",
          "Premium Decals",
          "Aerodynamic Mirrors",
        ],
      },
    ],
    notes: ["A true entry-level superbike with smooth handling."],
  },
  {
    slug: "royal-enfield-hunter-350",
    name: "Royal Enfield Hunter 350",
    mileage: "36 km/l",
    colors: [
      { name: "Dapper Grey", code: "#808080" },
      { name: "Rebel Blue", code: "#0033FF" },
    ],
    images: ["/images/harley.avif"],
    baseFeatures: [
      {
        fuelTankCapacity: "13 L",
        engine: "349cc, Air-cooled, 20 HP",
        torque: "27 Nm",
        make: "2025",
      },
    ],
    variants: [
      {
        name: "Retro",
        price: 300000,
        image: "/images/harley.avif",
        features: [
          "Analog Console",
          "Spoke Wheels",
          "Disc Brake Front",
          "Classic Styling",
          "Comfortable Suspension",
        ],
      },
      {
        name: "Metro Rebel",
        price: 345000,
        image: "/images/harley-silver.avif",
        features: [
          "Digital-Analog Display",
          "Tubeless Tyres",
          "Dual Disc Brakes",
          "Modern Paint Job",
          "Trip Navigator Ready",
        ],
      },
    ],
    notes: ["Retro looks with modern agility."],
  },
  {
    slug: "ktm-duke-250",
    name: "KTM Duke 250",
    mileage: "31 km/l",
    colors: [
      { name: "Orange", code: "#FF6600" },
      { name: "Black", code: "#000000" },
    ],
    images: ["/images/harley.avif"],
    baseFeatures: [
      {
        fuelTankCapacity: "13.5 L",
        engine: "248cc, Single Cylinder, 30 HP",
        torque: "24 Nm",
        make: "2025",
      },
    ],
    variants: [
      {
        name: "Standard",
        price: 600000,
        image: "/images/harley-silver.avif",
        features: [
          "LED Projector Headlamp",
          "Supermoto ABS",
          "Quickshifter+",
          "TFT Display",
          "Lightweight Frame",
        ],
      },
      {
        name: "GP Edition",
        price: 630000,
        image: "/images/harley.avif",
        features: [
          "Racing Graphics",
          "WP Apex Suspension",
          "Bluetooth Connectivity",
          "Slipper Clutch",
          "Orange Trellis Frame",
        ],
      },
    ],
    notes: ["Streetfighter performance in compact form."],
  },
  // Add 5 more bikes similarly if you want (I can fill them next if needed)
];

export const carsData = [
  {
    slug: "toyota-corolla",
    name: "Toyota Corolla",
    mileage: "18 km/l",
    colors: [
      { name: "White Pearl", code: "#FFFFFF" },
      { name: "Silver Metallic", code: "#C0C0C0" },
    ],
    images: ["/images/car1.avif", "/images/mcqueen.jpg"],
    baseFeatures: [
      {
        fuelTankCapacity: "50 L",
        engine: "1.8L Petrol, 138 HP",
        torque: "173 Nm",
        make: "2025",
      },
    ],
    variants: [
      {
        name: "G MT",
        price: 5500000,
        image: "/images/car1.avif",
        features: [
          "LED Projector Headlights",
          "Push Start Button",
          "Auto Climate Control",
          "Rear Camera",
          "Touch Infotainment System",
        ],
      },
      {
        name: "V CVT",
        price: 6250000,
        image: "/images/mcqueen.jpg",
        features: [
          "Sunroof",
          "Cruise Control",
          "Wireless Charging",
          "Lane Departure Warning",
          "Leather Seats",
        ],
      },
    ],
    notes: ["Reliable sedan with excellent comfort and resale value."],
  },
  {
    slug: "honda-city",
    name: "Honda City",
    mileage: "20 km/l",
    colors: [
      { name: "Lunar Silver", code: "#C0C0C0" },
      { name: "Radiant Red", code: "#FF0000" },
    ],
    images: ["/images/car1.avif", "/images/mcqueen.jpg"],
    baseFeatures: [
      {
        fuelTankCapacity: "40 L",
        engine: "1.5L i-VTEC, 121 HP",
        torque: "145 Nm",
        make: "2025",
      },
    ],
    variants: [
      {
        name: "V MT",
        price: 4800000,
        image: "/images/car1.avif",
        features: [
          "Keyless Entry",
          "Rear Parking Sensor",
          "LED DRLs",
          "Apple CarPlay & Android Auto",
          "Steering Mounted Controls",
        ],
      },
      {
        name: "ZX CVT",
        price: 5400000,
        image: "/images/mcqueen.jpg",
        features: [
          "LaneWatch Camera",
          "Sunroof",
          "Auto Dimming IRVM",
          "6 Airbags",
          "Premium Alloy Wheels",
        ],
      },
    ],
    notes: ["Refined, smooth, and feature-packed sedan."],
  },
  {
    slug: "hyundai-creta",
    name: "Hyundai Creta",
    mileage: "17 km/l",
    colors: [
      { name: "Titan Grey", code: "#778899" },
      { name: "Polar White", code: "#FFFFFF" },
    ],
    images: ["/images/mcqueen.jpg"],
    baseFeatures: [
      {
        fuelTankCapacity: "50 L",
        engine: "1.5L Petrol, 115 HP",
        torque: "144 Nm",
        make: "2025",
      },
    ],
    variants: [
      {
        name: "S MT",
        price: 4800000,
        image: "/images/car1.avif",
        features: [
          "Panoramic Sunroof",
          "10.25-inch Infotainment Display",
          "Rear Parking Camera",
          "Electronic Stability Control",
          "LED DRLs",
        ],
      },
      {
        name: "SX(O) IVT",
        price: 6200000,
        image: "/images/mcqueen.jpg",
        features: [
          "Wireless Charging",
          "Ventilated Seats",
          "Ambient Lighting",
          "Cruise Control",
          "Connected Car Tech",
        ],
      },
    ],
    notes: ["Top-selling SUV with strong road presence."],
  },
  {
    slug: "kia-sonet",
    name: "Kia Sonet",
    mileage: "19 km/l",
    colors: [
      { name: "Red", code: "#FF0000" },
      { name: "Grey", code: "#808080" },
    ],
    images: ["/images/car1.avif"],
    baseFeatures: [
      {
        fuelTankCapacity: "45 L",
        engine: "1.2L Petrol, 83 HP",
        torque: "115 Nm",
        make: "2025",
      },
    ],
    variants: [
      {
        name: "HTK+",
        price: 4200000,
        image: "/images/car1.avif",
        features: [
          "Smart Entry",
          "8-inch Touchscreen",
          "Rear AC Vents",
          "Hill Start Assist",
          "ABS with EBD",
        ],
      },
      {
        name: "GTX+ Turbo",
        price: 5100000,
        image: "/images/mcqueen.jpg",
        features: [
          "Sunroof",
          "BOSE Sound System",
          "LED Headlamps",
          "Wireless Charger",
          "ESC & Traction Control",
        ],
      },
    ],
    notes: ["Compact SUV with sporty looks and features."],
  },
  {
    slug: "suzuki-swift",
    name: "Suzuki Swift",
    mileage: "23 km/l",
    colors: [
      { name: "Pearl Arctic White", code: "#FFFFFF" },
      { name: "Solid Fire Red", code: "#FF2400" },
    ],
    images: ["/images/car1.avif"],
    baseFeatures: [
      {
        fuelTankCapacity: "37 L",
        engine: "1.2L Petrol, 90 HP",
        torque: "113 Nm",
        make: "2025",
      },
    ],
    variants: [
      {
        name: "VXi",
        price: 3300000,
        image: "/images/car1.avif",
        features: [
          "Dual Airbags",
          "ABS with EBD",
          "Power Windows",
          "LED Tail Lamps",
          "Audio System with USB",
        ],
      },
      {
        name: "ZXi+",
        price: 3800000,
        image: "/images/mcqueen.jpg",
        features: [
          "Touchscreen Infotainment",
          "Cruise Control",
          "Automatic Climate Control",
          "Push Start",
          "Alloy Wheels",
        ],
      },
    ],
    notes: ["Compact hatchback loved for reliability and mileage."],
  },
  {
    slug: "mahindra-thar",
    name: "Mahindra Thar",
    mileage: "14 km/l",
    colors: [
      { name: "Red Rage", code: "#FF0000" },
      { name: "Aquamarine", code: "#00CED1" },
    ],
    images: ["/images/mcqueen.jpg"],
    baseFeatures: [
      {
        fuelTankCapacity: "57 L",
        engine: "2.0L Turbo Petrol, 150 HP",
        torque: "320 Nm",
        make: "2025",
      },
    ],
    variants: [
      {
        name: "AX Opt",
        price: 4800000,
        image: "/images/car1.avif",
        features: [
          "Removable Roof",
          "4x4 Drivetrain",
          "Touch Infotainment",
          "Dual Airbags",
          "All Terrain Tyres",
        ],
      },
      {
        name: "LX AT",
        price: 5900000,
        image: "/images/mcqueen.jpg",
        features: [
          "Cruise Control",
          "Automatic Transmission",
          "Rollover Mitigation",
          "Adventure Graphics",
          "LED DRLs",
        ],
      },
    ],
    notes: ["Off-road icon reborn with modern tech."],
  },
  {
    slug: "tata-nexon",
    name: "Tata Nexon",
    mileage: "21 km/l",
    colors: [
      { name: "Daytona Grey", code: "#555555" },
      { name: "Flame Red", code: "#E34234" },
    ],
    images: ["/images/car1.avif"],
    baseFeatures: [
      {
        fuelTankCapacity: "44 L",
        engine: "1.2L Turbo Petrol, 120 HP",
        torque: "170 Nm",
        make: "2025",
      },
    ],
    variants: [
      {
        name: "XZ+",
        price: 4200000,
        image: "/images/car1.avif",
        features: [
          "Dual Airbags",
          "ABS with EBD",
          "Harman Infotainment System",
          "Reverse Camera",
          "Projector Headlamps",
        ],
      },
      {
        name: "Creative+ AMT",
        price: 4650000,
        image: "/images/mcqueen.jpg",
        features: [
          "Wireless Android Auto",
          "Sunroof",
          "Digital Cluster",
          "Connected Car Tech",
          "6 Airbags",
        ],
      },
    ],
    notes: ["Safe, stylish, and feature-loaded SUV."],
  },
  {
    slug: "hyundai-verna",
    name: "Hyundai Verna",
    mileage: "19 km/l",
    colors: [
      { name: "Fiery Red", code: "#FF2400" },
      { name: "Typhoon Silver", code: "#C0C0C0" },
    ],
    images: ["/images/mcqueen.jpg"],
    baseFeatures: [
      {
        fuelTankCapacity: "45 L",
        engine: "1.5L Turbo Petrol, 160 HP",
        torque: "253 Nm",
        make: "2025",
      },
    ],
    variants: [
      {
        name: "SX MT",
        price: 5000000,
        image: "/images/car1.avif",
        features: [
          "Voice Commands",
          "Ventilated Seats",
          "All Digital Console",
          "Rear AC Vents",
          "Ambient Lighting",
        ],
      },
      {
        name: "SX(O) DCT",
        price: 6200000,
        image: "/images/mcqueen.jpg",
        features: [
          "ADAS Level 2",
          "6 Airbags",
          "Electric Sunroof",
          "Wireless Charging",
          "Touch HVAC Controls",
        ],
      },
    ],
    notes: ["Sedan with futuristic looks and power-packed performance."],
  },
  {
    slug: "skoda-slavia",
    name: "Skoda Slavia",
    mileage: "19 km/l",
    colors: [
      { name: "Crystal Blue", code: "#007BA7" },
      { name: "Carbon Steel", code: "#333333" },
    ],
    images: ["/images/car1.avif"],
    baseFeatures: [
      {
        fuelTankCapacity: "45 L",
        engine: "1.0L TSI Petrol, 115 HP",
        torque: "178 Nm",
        make: "2025",
      },
    ],
    variants: [
      {
        name: "Active MT",
        price: 4700000,
        image: "/images/car1.avif",
        features: [
          "LED DRLs",
          "8-inch Infotainment Display",
          "Cruise Control",
          "ABS with EBD",
          "Dual Front Airbags",
        ],
      },
      {
        name: "Style AT",
        price: 5700000,
        image: "/images/mcqueen.jpg",
        features: [
          "Electric Sunroof",
          "Ventilated Seats",
          "Premium Leather Upholstery",
          "Auto Headlamps",
          "Wireless Android Auto",
        ],
      },
    ],
    notes: ["Premium European sedan with solid build quality."],
  },
  {
    slug: "mg-zs-ev",
    name: "MG ZS EV",
    mileage: "461 km/full charge",
    colors: [
      { name: "Currant Red", code: "#B22222" },
      { name: "Ash Grey", code: "#808080" },
    ],
    images: ["/images/mcqueen.jpg"],
    baseFeatures: [
      {
        fuelTankCapacity: "N/A (Electric)",
        engine: "Electric Motor, 176 HP",
        torque: "280 Nm",
        make: "2025",
      },
    ],
    variants: [
      {
        name: "Excite",
        price: 6200000,
        image: "/images/car1.avif",
        features: [
          "8-inch Touchscreen",
          "Digital Cluster",
          "Keyless Entry",
          "Reverse Camera",
          "Fast Charging Support",
        ],
      },
      {
        name: "Exclusive",
        price: 6900000,
        image: "/images/mcqueen.jpg",
        features: [
          "Panoramic Sunroof",
          "Wireless Charger",
          "Leather Upholstery",
          "6 Airbags",
          "iSmart Connected Tech",
        ],
      },
    ],
    notes: ["Feature-rich electric SUV with solid range."],
  },
];
export type Motor = typeof bikesData[number];
