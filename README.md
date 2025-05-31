# CodeDuel

CodeDuel is a real-time competitive coding platform where developers can challenge each other to solve coding problems in 1v1 duels. Think Chess.com meets LeetCode!

![CodeDuel Banner](https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## Features

- 🎮 Real-time 1v1 coding battles
- ⚡ 60-second time limit per duel
- 🏆 Points-based ranking system
- 📊 Performance tracking and statistics
- 💻 Built-in code editor with syntax highlighting
- 🔍 Hidden test cases for thorough validation
- 📱 Responsive design for all devices

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Monaco Editor
- WebSocket for real-time communication

### Backend
- Node.js
- Fastify
- WebSocket
- TypeScript
- Zod for validation

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/code-duel.git
cd code-duel
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development servers:
```bash
# Start both frontend and backend
pnpm dev

# Start individual services
pnpm -F @coding-duel/frontend dev
pnpm -F @coding-duel/backend dev
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:3000`.

## Project Structure

```
code-duel/
├── packages/
│   ├── frontend/          # React frontend application
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── contexts/
│   │   │   ├── pages/
│   │   │   └── types/
│   │   └── package.json
│   │
│   └── backend/           # Fastify backend server
│       ├── src/
│       │   └── index.ts
│       └── package.json
│
├── package.json
└── pnpm-workspace.yaml
```

## Features in Detail

### Coding Duels
- Players are matched in real-time
- Both receive the same coding challenge
- 60-second time limit to solve
- First to correctly solve wins
- Points awarded based on speed and difficulty

### User Profiles
- Track win/loss ratio
- View past matches
- Monitor ranking progress
- Earn achievements
- View performance by challenge type

### Challenge Types
- Arrays and Strings
- Dynamic Programming
- Trees and Graphs
- Sorting and Searching
- And more!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Monaco Editor](https://microsoft.github.io/monaco-editor/) for the code editor
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide Icons](https://lucide.dev/) for beautiful icons
- [Inter Font](https://rsms.me/inter/) for typography
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/) for code snippets