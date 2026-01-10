# Family Bulletin Board

Ứng dụng web quản lý và chia sẻ thông tin gia đình được xây dựng bằng Vue.js 3 với Pinia và Tailwind CSS.

## Tính năng

- 🏠 **Trang chủ**: Bảng tin gia đình với các sự kiện sắp tới và kỷ niệm
- 👤 **Hồ sơ thành viên**: Xem thông tin chi tiết của từng thành viên
- 🌳 **Cây gia phả**: Cây gia phả tương tác với khả năng tìm kiếm
- 📅 **Quản lý sự kiện**: Lịch gia đình với các sự kiện quan trọng
- 📸 **Thư viện ảnh & video**: Xem và quản lý ảnh, video của gia đình

## Công nghệ sử dụng

- **Vue.js 3**: Framework JavaScript với Composition API
- **Pinia**: State management
- **Vue Router**: Routing
- **Tailwind CSS**: Styling
- **Vite**: Build tool

## Cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Chạy development server:
```bash
npm run dev
```

3. Build cho production:
```bash
npm run build
```

## Cấu trúc dự án

```
src/
├── components/       # Các components tái sử dụng
│   ├── BottomNav.vue
│   ├── EventCard.vue
│   ├── FeedCard.vue
│   └── TopBar.vue
├── stores/          # Pinia stores
│   ├── useAppStore.js
│   ├── useEventsStore.js
│   ├── useFamilyStore.js
│   ├── useFeedStore.js
│   └── useGalleryStore.js
├── views/           # Các trang chính
│   ├── Events.vue
│   ├── FamilyTree.vue
│   ├── Gallery.vue
│   ├── Home.vue
│   └── Profile.vue
├── router/          # Vue Router configuration
│   └── index.js
├── App.vue
├── main.js
└── style.css
```

## License

MIT

