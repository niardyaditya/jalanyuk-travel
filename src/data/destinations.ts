import { Destination } from '../types/travel';

export const DESTINATIONS: Destination[] = [
  {
    id: 'raja-ampat',
    slug: 'raja-ampat-misool-pianemo',
    name: 'Raja Ampat Misool & Pianemo',
    titleTag: 'Raja Ampat: Ekspedisi Misool & Gugusan Karst Pianemo',
    location: 'Kepulauan Raja Ampat',
    province: 'Papua Barat Daya',
    country: 'Indonesia',
    category: 'Petualangan Alam',
    rating: 4.9,
    reviewCount: 1240,
    duration: '4H3M',
    tripType: 'Phinisi Liveaboard',
    pricePerPerson: 5850000,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=1200&q=80',
        caption: 'Spot Ikonik Pianemo Geosite',
        category: 'Geosite'
      },
      {
        url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
        caption: 'Misool Coral Sanctuary',
        category: 'Underwater'
      },
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        caption: 'Liveaboard Phinisi Deck',
        category: 'Boat'
      },
      {
        url: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80',
        caption: 'Water Villa Sauwandarek',
        category: 'Lodge'
      },
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        caption: 'Sunset Manta Sandy',
        category: 'Sunset'
      }
    ],
    shortDescription: 'Gugusan pulau karang eksotis, perairan toska sejernih kristal, dan surga biota laut tropis terkaya di dunia.',
    narrativeOverview: [
      'Selamat datang di episentrum keanekaragaman hayati laut dunia. Ekspedisi 4 Hari 3 Malam ini dirancang khusus untuk membawa Anda menyusuri keindahan tak tertandingi di Kepulauan Raja Ampat. Bersama para ranger lokal berpengalaman, kita akan berlayar melintasi laguna toska yang jernih, memanjat tangga kayu menuju puncak Pianemo untuk menikmati panorama gugusan karst yang melegenda, hingga bersua pari manta raksasa di perairan Manta Sandy.',
      'Kenyamanan dan kelestarian alam menjadi komitmen utama kami. Anda akan menjelajah dengan kapal Phinisi semi-luxury ber-AC, menikmati sajian boga bahari segar olahan koki lokal, dan bermalam di kabin tepi laut yang menyatu dengan kesahajaan alam Papua. Setiap jejak langkah Anda didukung sertifikasi ekowisata demi melestarikan terumbu karang yang berusia jutaan tahun.'
    ],
    specs: {
      duration: '4 Hari 3 Malam',
      groupSize: 'Maks. 12 Orang',
      difficulty: 'Sedang (Moderate)',
      meetingPoint: 'Bandara Sorong (SOQ)'
    },
    advantages: [
      {
        icon: 'badge',
        title: 'Pemandu Naturalis Lokal',
        description: 'Didampingi divemaster & pemandu suku asli yang mengenali setiap lorong karst dan waktu terbaik mengamati satwa liar.'
      },
      {
        icon: 'directions_boat',
        title: 'Kapal Phinisi Ber-AC',
        description: 'Kabin berpenyejuk udara yang nyaman, lounge panoramik terbuka, dan standar keselamatan laut internasional lengkap.'
      },
      {
        icon: 'scuba_diving',
        title: 'Alat Snorkeling Standar Mares',
        description: 'Peralatan snorkel dan life-jacket tersterilisasi standar internasional, siap memfasilitasi penjelajahan terumbu karang.'
      },
      {
        icon: 'restaurant',
        title: 'Boga Bahari Segar & Halal',
        description: 'Menu bergizi khas Nusantara dan olahan tangkapan laut segar harian oleh koki kapal bersertifikat halal.'
      }
    ],
    itinerary: [
      {
        day: 1,
        timeRange: '08:00 - 18:00 WIT',
        title: 'Sorong – Penjemputan Bandara & Menuju Misool Shark Point',
        description: 'Penjemputan di Bandara Domine Eduard Osok (SOQ) Sorong oleh kru JalanYuk. Transfer ke Pelabuhan Rakyat untuk menaiki Phinisi. Pelayaran dimulai menuju Kepulauan Misool bagian utara. Check-in kabin, santap siang di dek terbuka, dan berenang santai bersama hiu karang sirip hitam jinak di laguna jernih Misool.',
        highlights: ['Makan Siang & Malam Termasuk', 'Snorkeling Sesi 1', 'Sunset Cruise'],
        photoStamp: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80',
        stampLabel: 'Stamp 01 • Misool'
      },
      {
        day: 2,
        timeRange: '06:00 - 19:30 WIT',
        title: 'Pianemo Star Lagoon & Formasi Karst Batu Pensil',
        description: 'Pelayaran fajar menuju kawasan Pianemo. Trekking mendaki 320 anak tangga kayu ramah lingkungan menuju gardu pandang mahsyur Pianemo. Saksikan lanskap gugusan pulau karang di atas air toska. Dilanjutkan eksplorasi perahu kecil melintasi Laguna Berbintang (Telaga Bintang) dan batu karang menjulang Batu Pensil.',
        highlights: ['Makan Pagi, Siang & Malam', 'Spot Foto Pianemo', 'Dokumentasi Drone 4K'],
        photoStamp: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=400&q=80',
        stampLabel: 'Stamp 02 • Geosite Utama'
      },
      {
        day: 3,
        timeRange: '07:00 - 20:00 WIT',
        title: 'Desa Wisata Sauwandarek & Pertemuan Manta Sandy',
        description: 'Mengunjungi Desa Sauwandarek untuk berinteraksi dengan masyarakat lokal pembuat kerajinan anyaman topi daun pandan laut. Sore harinya, berlayar ke Manta Sandy, stasiun pembersihan alami di mana puluhan Pari Manta raksasa berkumpul untuk membersihkan diri di antara terumbu karang. Makan malam bertabur bintang di dek Phinisi.',
        highlights: ['Interaksi Budaya Lokal', 'Snorkeling Pari Manta', 'Seafood Gala Dinner'],
        photoStamp: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
        stampLabel: 'Stamp 03 • Manta Sandy'
      },
      {
        day: 4,
        timeRange: '07:00 - 14:00 WIT',
        title: 'Belanja Oleh-oleh Khas Papua & Transfer Bandara Sorong',
        description: 'Sarapan di atas kapal sambil pelayaran kembali menuju Sorong. Mengunjungi sentra suvenir khas Papua untuk membeli roti abon gulung Sorong, kopi Moanemani, dan noken rajut. Transfer tepat waktu menuju Bandara SOQ Sorong untuk penerbangan pulang ke kota asal.',
        highlights: ['Sarapan Pagi', 'Airport Drop-off', 'Sentra Kerajinan Noken'],
        photoStamp: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
        stampLabel: 'Stamp 04 • Sorong'
      }
    ],
    inclusions: [
      'Tiket PIN Retribusi Konservasi Resmi Raja Ampat (BLUD)',
      'Akomodasi 3 Malam di Kapal Phinisi Ber-AC / Eco Resort',
      'Makan 3x Sehari (Menu Nusantara, Boga Bahari Segar & Halal)',
      'Transportasi Speedboat & Kapal Eksplorasi selama 4 Hari',
      'Pemandu Naturalis Lokal Berlisensi & Ranger Konservasi',
      'Peralatan Snorkeling Lengkap Standar Mares & Life Jacket',
      'Air Mineral Bebas Isi Ulang & Kopi/Teh Sore'
    ],
    exclusions: [
      'Tiket Pesawat Domestik dari/ke Bandara Sorong (SOQ)',
      'Tipping Sukarela untuk Crew Kapal & Local Guide',
      'Pengeluaran Pribadi (Laundry, Minuman Beralkohol, Suvenir)',
      'Biaya Penyewaan Tabung Scuba Diving (Opsional bagi diver)'
    ],
    faqs: [
      {
        question: 'Bagaimana kesiapan fisik yang dibutuhkan untuk trip ini?',
        answer: 'Tingkat kebugaran fisik berada pada level moderat (sedang). Pendakian tangga di Pianemo memiliki 320 anak tangga dengan railing pengaman dan pos peristirahatan. Tidak diperlukan sertifikasi diving jika Anda hanya berencana snorkeling. Life jacket selalu disediakan bagi traveler yang belum mahir berenang.'
      },
      {
        question: 'Apakah ada sinyal internet & telekomunikasi selama berlayar?',
        answer: 'Sinyal Telkomsel 4G tersedia kuat di area Sorong, Kota Waisai, dan beberapa titik di Pianemo. Namun saat berada di perairan lepas atau laguna Misool terpencil, sinyal seluler dapat terbatas. Kapal kami dilengkapi radio komunikasi darurat marine VHF dan sambungan internet satelit Starlink opsional di ruang bersama.'
      },
      {
        question: 'Perlengkapan pribadi apa saja yang wajib dibawa?',
        answer: 'Kami sangat mewajibkan tabir surya ramah terumbu karang (reef-safe sunscreen), dry bag tahan air untuk ponsel & kamera, sepatu air (water shoes) untuk trekking bebatuan karst, kacamata hitam UV, topi rimba, serta lotion anti nyamuk alami.'
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Rian Andika',
        city: 'Jakarta',
        date: 'November 2024',
        rating: 5,
        comment: 'Pengalaman seumur hidup yang tak terlupakan! Pianemo aslinya jauh lebih indah daripada foto-foto di internet. Pemandu lokal Kak Yan sangat ramah, sabar membimbing kami yang masih pemula saat snorkeling di Manta Sandy. Makanannya melimpah dan rasanya juara!',
        verified: true,
        helpfulCount: 34
      },
      {
        id: 'rev-2',
        author: 'Maya Lestari',
        city: 'Surabaya',
        date: 'Oktober 2024',
        rating: 5,
        comment: 'Kabin kapal bersih dan AC-nya dingin. Jadwal trip tertata rapi tanpa kesan diburu-buru. Pemandangan bintang malam hari dari atas dek Phinisi sungguh magis. Sangat merekomendasikan JalanYuk untuk trip Papua!',
        verified: true,
        helpfulCount: 19
      }
    ],
    alternativeDestinations: ['labuan-bajo', 'sumba-savana', 'bromo-sunrise']
  },
  {
    id: 'labuan-bajo',
    slug: 'labuan-bajo-komodo-liveaboard',
    name: 'Labuan Bajo & Komodo Liveaboard',
    titleTag: 'Labuan Bajo & Pulau Komodo: Liveaboard Phinisi Cruise',
    location: 'Manggarai Barat',
    province: 'Nusa Tenggara Timur',
    country: 'Indonesia',
    category: 'Pantai Tropis',
    rating: 4.9,
    reviewCount: 980,
    duration: '3H2M',
    tripType: 'Phinisi Cruise',
    pricePerPerson: 4200000,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
        caption: 'Golden Hour Padar Island',
        category: 'Panorama'
      },
      {
        url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
        caption: 'Pink Beach Waters',
        category: 'Beach'
      },
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        caption: 'Phinisi Sailing Sunset',
        category: 'Boat'
      }
    ],
    shortDescription: 'Sunset memukau di puncak bukit Padar, Pink Beach eksotis, dan petualangan berlayar phinisi legendaris.',
    narrativeOverview: [
      'Berlayar melintasi gugusan pulau vulkanik di Taman Nasional Komodo dengan kapal Phinisi kayu tradisional. Anda akan disambut panorama legendaris dari puncak bukit Pulau Padar dengan tiga lekuk teluk berwarna kontras.',
      'Saksikan langsung kadal purba Komodo di habitat aslinya di Pulau Rinca dengan pengawalan ranger profesional, snorkeling bersama puluhan pari manta di Manta Point, dan nikmati hembusan angin laut Flores yang magis.'
    ],
    specs: {
      duration: '3 Hari 2 Malam',
      groupSize: 'Maks. 14 Orang',
      difficulty: 'Mudah - Sedang',
      meetingPoint: 'Bandara Komodo (LBJ)'
    },
    advantages: [
      {
        icon: 'explore',
        title: 'Rute Phinisi Terbaik',
        description: 'Menjangkau Padar, Pink Beach, Taka Makassar, Manta Point, dan Pulau Kalong saat ribuan kelelawar terbang melintasi senja.'
      },
      {
        icon: 'verified_user',
        title: 'Ranger TN Komodo Resmi',
        description: 'Jaminan keamanan ekstra saat trekking habitat satwa purba dengan pengawasan ketat ranger berpengalaman.'
      }
    ],
    itinerary: [
      {
        day: 1,
        timeRange: '09:00 - 18:30 WITA',
        title: 'Pelabuhan Labuan Bajo – Pulau Kelor & Sunset Pulau Kalong',
        description: 'Penjemputan di hotel/bandara. Berlayar ke Pulau Kelor untuk trekking singkat dan pemandangan laut toska. Lanjut ke Manjarite snorkeling spot. Menjelang malam, singgah di perairan Pulau Kalong menyaksikan jutaan kelelawar terbang.',
        highlights: ['Trekking Kelor', 'Snorkeling Manjarite', 'Sunset Kalong'],
        photoStamp: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80'
      },
      {
        day: 2,
        timeRange: '05:00 - 19:00 WITA',
        title: 'Sunrise Padar Island, Pink Beach & Snorkeling Manta Point',
        description: 'Pendakian fajar di puncak Pulau Padar untuk menyaksikan sunrise spektakuler. Santap pagi di kapal lalu bersantai di pasir merah muda Pink Beach. Menjelang siang, berenang bersama Manta Ray di Taka Makassar.',
        highlights: ['Puncak Padar', 'Pink Beach', 'Manta Point']
      },
      {
        day: 3,
        timeRange: '07:30 - 14:00 WITA',
        title: 'Pulau Komodo Rinca – Pulau Kanawa – Transfer Bandara',
        description: 'Trekking pagi menjumpai Komodo Dragon dengan ranger. Berlayar menuju terumbu karang dangkal Pulau Kanawa untuk snorkeling perpisahan. Kembali ke Labuan Bajo dan diantar ke Bandara Komodo.',
        highlights: ['Trekking Komodo', 'Pulau Kanawa', 'Airport Drop']
      }
    ],
    inclusions: [
      'Kapal Phinisi AC selama 3 Hari 2 Malam',
      'Makan 3x sehari sajian koki kapal (Menu Halal & Segar)',
      'Alat snorkeling lengkap & life vest',
      'Pemandu wisata & dokumentasi trip',
      'Penjemputan PP Bandara Labuan Bajo'
    ],
    exclusions: [
      'Tiket Pesawat ke/dari Labuan Bajo',
      'Tiket Masuk Taman Nasional Komodo',
      'Keperluan pribadi & tips kru'
    ],
    faqs: [
      {
        question: 'Apakah aman untuk anak-anak dan lansia?',
        answer: 'Sangat aman. Trekking di Padar memiliki anak tangga dan jalur setapak yang terawat. Anak-anak dan lansia dapat menyesuaikan ritme pendakian.'
      }
    ],
    reviews: [
      {
        id: 'rev-3',
        author: 'Dian Prasetya',
        city: 'Bandung',
        date: 'Desember 2024',
        rating: 5,
        comment: 'Sunrise di Padar bener-bener bikin merinding saking indahnya. Kru kapal super ramah dan makanan di Phinisi enak banget!',
        verified: true,
        helpfulCount: 22
      }
    ],
    alternativeDestinations: ['raja-ampat', 'sumba-savana', 'bromo-sunrise']
  },
  {
    id: 'bromo-sunrise',
    slug: 'bromo-golden-sunrise-pasir-berbisik',
    name: 'Bromo Golden Sunrise & Pasir Berbisik',
    titleTag: 'Bromo Sunrise & Kawah Ijen Blue Fire Adventure',
    location: 'Probolinggo & Malang',
    province: 'Jawa Timur',
    country: 'Indonesia',
    category: 'Petualangan Alam',
    rating: 4.8,
    reviewCount: 1520,
    duration: '2H1M',
    tripType: 'Jeep 4x4 Sunrise Trip',
    pricePerPerson: 1750000,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80',
        caption: 'Magical Bromo Sunrise Over Caldera',
        category: 'Sunrise'
      },
      {
        url: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&w=800&q=80',
        caption: 'Sea of Sand Jeep Adventure',
        category: 'Jeep'
      }
    ],
    shortDescription: 'Sensasi lautan pasir berkabut, kawah aktif megah, dan hangatnya panorama fajar emas di Puncak Penanjakan.',
    narrativeOverview: [
      'Rasakan sensasi petualangan berkendara Jeep 4x4 menembus dinginnya malam melintasi lautan pasir kaldera Tengger. Saat fajar merekah di ufuk timur Puncak Penanjakan, siluet Gunung Bromo, Batok, dan Semeru yang berdiri kokoh akan menyuguhkan pemandangan magis yang tiada duanya.',
      'Lanjutkan langkah Anda menaiki tangga kawah Bromo yang aktif bergemuruh, melintasi Pasir Berbisik yang luas, dan menikmati ketenangan Bukit Teletubbies yang hijau nan asri.'
    ],
    specs: {
      duration: '2 Hari 1 Malam',
      groupSize: 'Maks. 6 Orang / Jeep',
      difficulty: 'Mudah',
      meetingPoint: 'Stasiun / Bandara Malang / Surabaya'
    },
    advantages: [
      {
        icon: 'local_taxi',
        title: 'Jeep 4x4 Hardtop Terawat',
        description: 'Driver lokal berpengalaman medan pasir kaldera yang ramah dan siap membantu pengambilan foto terbaik.'
      }
    ],
    itinerary: [
      {
        day: 1,
        timeRange: '23:00 - 04:00 WIB',
        title: 'Penjemputan Malang/Surabaya & Perjalanan ke Rest Area Bromo',
        description: 'Penjemputan tengah malam dari kota Malang atau Surabaya. Transit ke Jeep 4x4 di rest area Tosari/Sukapura.',
        highlights: ['Midnight pickup', 'Jeep 4x4 transition']
      },
      {
        day: 2,
        timeRange: '04:00 - 12:00 WIB',
        title: 'Puncak Penanjakan Sunrise – Kawah Bromo – Bukit Teletubbies',
        description: 'Menikmati golden sunrise di Penanjakan 1. Eksplorasi Kawah Bromo, Pura Poten, Pasir Berbisik, dan Savana Teletubbies.',
        highlights: ['Golden Sunrise', 'Kawah Bromo', 'Pasir Berbisik', 'Savana']
      }
    ],
    inclusions: [
      'Transportasi PP Malang/Surabaya',
      'Jeep 4x4 Bromo All Spot',
      'Tiket Masuk TN Bromo Tengger Semeru',
      'Driver as Guide & BBM',
      'Air mineral & masker'
    ],
    exclusions: ['Sewa Kuda di Lautan Pasir', 'Pengeluaran pribadi'],
    faqs: [
      {
        question: 'Berapa suhu udara di Bromo saat dini hari?',
        answer: 'Suhu bisa berkisar antara 5°C hingga 12°C. Disarankan memakai jaket tebal, sarung tangan, syal, dan kupluk.'
      }
    ],
    reviews: [
      {
        id: 'rev-4',
        author: 'Fajar Nugroho',
        city: 'Yogyakarta',
        date: 'Januari 2025',
        rating: 5,
        comment: 'Driver Jeep Pak Slamet luar biasa! Dia tahu spot tersembunyi yang sepi turis buat foto sunrise. Bromo selalu bikin takjub.',
        verified: true,
        helpfulCount: 15
      }
    ],
    alternativeDestinations: ['raja-ampat', 'labuan-bajo', 'sumba-savana']
  },
  {
    id: 'sumba-savana',
    slug: 'sumba-savana-air-terjun-tanggedu',
    name: 'Sumba Savana & Air Terjun Tanggedu',
    titleTag: 'Eksotisme Savana & Adat Tradisi Sumba 4H3M',
    location: 'Sumba Timur & Barat',
    province: 'Nusa Tenggara Timur',
    country: 'Indonesia',
    category: 'Hidden Gems',
    rating: 4.8,
    reviewCount: 640,
    duration: '4H3M',
    tripType: 'Overland Eco Tour',
    pricePerPerson: 3900000,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        caption: 'Wairinding Rolling Hills at Sunset',
        category: 'Savana'
      },
      {
        url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80',
        caption: 'Tanggedu Canyon Turquoise Pools',
        category: 'Waterfall'
      }
    ],
    shortDescription: 'Bentang bukit savana bergelombang tak berujung, megalitikum kampung adat, dan oasis air terjun perawan.',
    narrativeOverview: [
      'Pulau Sumba adalah permata tersembunyi dengan karakter geografis dan budaya megalitik yang unik di kepulauan Indonesia. Dari savana luas Bukit Wairinding yang berubah warna mengikuti musim, Danau laguna Weekuri berair asin jernih, hingga air terjun Tanggedu yang dijuluki Grand Canyon Sumba.',
      'Rasakan kehangatan masyarakat Desa Adat Ratenggaro dan Praijing dengan rumah beratap menara khas suku Marapu yang sarat filosofi leluhur.'
    ],
    specs: {
      duration: '4 Hari 3 Malam',
      groupSize: 'Maks. 10 Orang',
      difficulty: 'Sedang',
      meetingPoint: 'Bandara Tambolaka (TMC) / Waingapu (WGP)'
    },
    advantages: [
      {
        icon: 'forest',
        title: 'Eksplorasi Budaya Autentik',
        description: 'Kunjungan santun ke kampung adat megalitikum dipandu tetua lokal dengan edukasi tenun ikat pewarna alami.'
      }
    ],
    itinerary: [
      {
        day: 1,
        timeRange: '10:00 - 18:00 WITA',
        title: 'Tambolaka – Danau Weekuri & Sunset Pantai Mandorak',
        description: 'Tiba di Bandara Tambolaka, santap siang masakan khas Sumba. Berenang di laguna Weekuri dan menikmati sunset di tebing Mandorak.',
        highlights: ['Danau Weekuri', 'Pantai Mandorak']
      },
      {
        day: 2,
        timeRange: '08:00 - 18:00 WITA',
        title: 'Desa Adat Ratenggaro – Air Terjun Lapopu',
        description: 'Mengunjungi rumah adat menara tinggi Ratenggaro di bibir pantai dan berenang di kesejukan air terjun Lapopu.',
        highlights: ['Ratenggaro', 'Air Terjun Lapopu']
      },
      {
        day: 3,
        timeRange: '07:00 - 18:30 WITA',
        title: 'Tanggedu Waterfall Canyon & Sunset Bukit Wairinding',
        description: 'Trekking menuju canyon Tanggedu dengan perairan toska alami. Sore hari menuju Bukit Wairinding menikmati bentang savana berombak.',
        highlights: ['Tanggedu Canyon', 'Bukit Wairinding']
      },
      {
        day: 4,
        timeRange: '07:30 - 12:00 WITA',
        title: 'Bukit Tenau – Sentra Tenun Ikat – Bandara Waingapu',
        description: 'Sunrise di Bukit Tenau, belanja cenderamata kain tenun pewarna alami khas Sumba Timur, dan transfer ke Bandara Waingapu.',
        highlights: ['Bukit Tenau', 'Tenun Sumba', 'Airport Drop']
      }
    ],
    inclusions: [
      'Transportasi AC Overland selama 4 Hari',
      'Akomodasi Hotel Bintang 3 / Eco Resort 3 Malam',
      'Makan harian lengkap & air mineral',
      'Tiket masuk seluruh objek wisata & retribusi adat',
      'Pemandu lokal profesional'
    ],
    exclusions: ['Tiket pesawat ke/dari Sumba', 'Pengeluaran pribadi'],
    faqs: [
      {
        question: 'Kapan waktu terbaik mengunjungi Sumba?',
        answer: 'Bulan April - Juni untuk pemandangan savana hijau segar, atau Juli - Oktober untuk savana bernuansa emas eksotis ala Afrika.'
      }
    ],
    reviews: [
      {
        id: 'rev-5',
        author: 'Arini Kusuma',
        city: 'Semarang',
        date: 'Februari 2025',
        rating: 5,
        comment: 'Sumba bener-bener magis! Bukit Wairinding pas sunset ga ada duanya. Penginapan bersih dan driver sangat sabar serta helpful.',
        verified: true,
        helpfulCount: 11
      }
    ],
    alternativeDestinations: ['raja-ampat', 'labuan-bajo', 'bromo-sunrise']
  },
  {
    id: 'bali-terraces',
    slug: 'bali-tropical-escapes-terraces',
    name: 'Bali Tropical Escapes & Terraces',
    titleTag: 'Bali: Ubud Rice Terraces, Secret Waterfalls & Nusa Penida',
    location: 'Ubud & Nusa Penida',
    province: 'Bali',
    country: 'Indonesia',
    category: 'Wisata Budaya',
    rating: 4.7,
    reviewCount: 2100,
    duration: '5H4M',
    tripType: 'Cultural Eco Retreat',
    pricePerPerson: 3650000,
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80',
        caption: 'Tegallalang Emerald Rice Terraces',
        category: 'Terrace'
      }
    ],
    shortDescription: 'Terasering hijau berundak Ubud, ketenangan yoga retreat, dan tebing megah Kelingking Nusa Penida.',
    narrativeOverview: [
      'Temukan kedamaian batin di jantung spiritual Pulau Dewata. Menjelajah terasering padi Tegallalang saat embun pagi masih bertengger, menyusuri air terjun tersembunyi Kanto Lampo, hingga menyeberang ke tebing samudra Nusa Penida.'
    ],
    specs: {
      duration: '5 Hari 4 Malam',
      groupSize: 'Maks. 8 Orang',
      difficulty: 'Mudah',
      meetingPoint: 'Bandara Ngurah Rai (DPS)'
    },
    advantages: [
      {
        icon: 'spa',
        title: 'Wellness & Mindfulness',
        description: 'Paduan relaksasi spa alami, konsumsi organik farm-to-table, dan interaksi budaya lokal yang mendalam.'
      }
    ],
    itinerary: [
      {
        day: 1,
        timeRange: '10:00 - 18:00 WITA',
        title: 'Tiba di Bali & Check-in Ubud Eco Resort',
        description: 'Penjemputan di bandara, welcome drink kelapa muda, relaksasi sore di villa Ubud.',
        highlights: ['Airport pickup', 'Ubud villa check-in']
      }
    ],
    inclusions: ['Akomodasi 4 Malam Villa Ubud', 'Transportasi privat', 'Makan harian'],
    exclusions: ['Tiket Pesawat', 'Pengeluaran pribadi'],
    faqs: [
      {
        question: 'Apakah rute ini ramah keluarga?',
        answer: 'Sangat ramah untuk liburan keluarga dengan ritme santai.'
      }
    ],
    reviews: [],
    alternativeDestinations: ['raja-ampat', 'labuan-bajo']
  },
  {
    id: 'banff-canada',
    slug: 'banff-majestic-lakes-mountains',
    name: 'Banff National Park & Rocky Lakes',
    titleTag: 'Banff, Canada: Majestic Lakes & Glacier Mountain Trails',
    location: 'Alberta',
    province: 'Rocky Mountains',
    country: 'Kanada',
    category: 'Petualangan Alam',
    rating: 4.8,
    reviewCount: 890,
    duration: '6H5M',
    tripType: 'Glacier Expedition',
    pricePerPerson: 10850000,
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80',
        caption: 'Lake Louise Turquoise Waters',
        category: 'Glacier'
      }
    ],
    shortDescription: 'Kemegahan danau gletser Moraine & Lake Louise berair toska diapit pegunungan bersalju abadi Rocky Mountain.',
    narrativeOverview: [
      'Rasakan petualangan alpine kelas dunia di Banff National Park. Berkano di atas air gletser sebening kaca dan menyusuri jalur trekking pohon pinus yang asri.'
    ],
    specs: {
      duration: '6 Hari 5 Malam',
      groupSize: 'Maks. 8 Orang',
      difficulty: 'Sedang',
      meetingPoint: 'Calgary International Airport (YYC)'
    },
    advantages: [],
    itinerary: [],
    inclusions: ['Akomodasi Alpine Lodge', 'Park Pass Banff', 'Private van'],
    exclusions: ['Tiket pesawat internasional', 'Visa Kanada'],
    faqs: [],
    reviews: [],
    alternativeDestinations: ['dolomites-italy']
  },
  {
    id: 'dolomites-italy',
    slug: 'dolomites-alpine-peaks-hiking',
    name: 'Dolomites Alpine Peaks & Hiking',
    titleTag: 'Dolomites, Italy: Alpine Peaks, Lago di Braies & Chalets',
    location: 'South Tyrol',
    province: 'Alps',
    country: 'Italia',
    category: 'Petualangan Alam',
    rating: 4.9,
    reviewCount: 780,
    duration: '7H6M',
    tripType: 'Alpine Hiking Tour',
    pricePerPerson: 13200000,
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80',
        caption: 'Tre Cime di Lavaredo Golden Peaks',
        category: 'Alpine'
      }
    ],
    shortDescription: 'Tebing batu kapur dramatis, padang rumput Alpe di Siusi, dan danau cermin Lago di Braies.',
    narrativeOverview: [
      'Menyusuri jalur pegunungan Alpen Italia yang masuk dalam warisan dunia UNESCO dengan udara sejuk dan akomodasi rifugio tradisional.'
    ],
    specs: {
      duration: '7 Hari 6 Malam',
      groupSize: 'Maks. 10 Orang',
      difficulty: 'Tinggi',
      meetingPoint: 'Venice Marco Polo Airport (VCE)'
    },
    advantages: [],
    itinerary: [],
    inclusions: ['Akomodasi Rifugio & Chalet', 'Pemandu gunung bersertifikasi IFMGA'],
    exclusions: ['Tiket pesawat', 'Visa Schengen'],
    faqs: [],
    reviews: [],
    alternativeDestinations: ['banff-canada']
  },
  {
    id: 'kyoto-japan',
    slug: 'kyoto-zen-temples-bamboo-forest',
    name: 'Kyoto Zen Temples & Bamboo Forest',
    titleTag: 'Kyoto, Japan: Arashiyama Bamboo, Ancient Temples & Tea Houses',
    location: 'Kansai',
    province: 'Kyoto Prefecture',
    country: 'Jepang',
    category: 'Wisata Budaya',
    rating: 4.9,
    reviewCount: 1450,
    duration: '5H4M',
    tripType: 'Cultural Exploration',
    pricePerPerson: 14500000,
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
        caption: 'Arashiyama Bamboo Grove Walkway',
        category: 'Nature'
      }
    ],
    shortDescription: 'Kesejukan lorong bambu Arashiyama, kuil kayu bersejarah Fushimi Inari, dan upacara matcha tradisional.',
    narrativeOverview: [
      'Menikmati ketenangan arsitektur kayu tradisional dan taman batu zen di Kyoto dengan pemandu lokal yang mendalami filosofi Wabi-Sabi.'
    ],
    specs: {
      duration: '5 Hari 4 Malam',
      groupSize: 'Maks. 8 Orang',
      difficulty: 'Mudah',
      meetingPoint: 'Kansai International Airport (KIX)'
    },
    advantages: [],
    itinerary: [],
    inclusions: ['Akomodasi Ryokan Tradisional', 'JR Pass Area Kansai', 'Upacara Teh'],
    exclusions: ['Tiket pesawat', 'Visa'],
    faqs: [],
    reviews: [],
    alternativeDestinations: ['bali-terraces']
  }
];
