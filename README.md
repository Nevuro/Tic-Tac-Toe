# Tic-Tac-Toe (Enhanced)

🎮 A classic Tic Tac Toe game built with React + TypeScript, featuring AI opponent, score tracking, game history, and full accessibility support.

## ✨ Features

### Core Gameplay
- **Interactive Gameplay**: Classic Tic Tac Toe with smooth animations
- **Turn Tracking**: Clear visual indicator of current player's turn
- **Win Detection**: Automatic detection of 8 winning combinations
- **Draw Detection**: Identifies stalemate when board is full
- **Game Reset**: One-click restart for new matches

### New in Enhanced
- **🤖 AI Opponent**: Play against computer with 3 difficulty levels (Easy/Medium/Hard) using minimax algorithm
- **📊 Score Tracking**: Persistent scores for Player X, Player O, and Draws
- **↩️ Undo Move**: Step back through move history
- **📜 Game History**: Sidebar showing all moves with board previews
- **💾 LocalStorage Persistence**: Game state survives browser refresh
- **♿ Full Accessibility**: ARIA labels, keyboard navigation, screen reader support, focus management
- **🌓 Theme Support**: CSS custom properties ready for dark/light mode
- **📱 Responsive Design**: Optimized for mobile and desktop

## 🛠 Technologies Used

- **React 18** - UI library with hooks and context
- **TypeScript 5** - Strict type safety throughout
- **Vite 5** - Fast build tool and dev server
- **Framer Motion 11** - Declarative animations
- **Sass/SCSS** - Component-scoped styling
- **ESLint** - Code quality with TypeScript rules

## 🏗 Architecture

```
src/
├── main.tsx                 # Entry point with GameProvider
├── App.tsx                  # Main layout composition
├── store/
│   └── GameContext.tsx      # Global state management (React Context)
├── utils/
│   └── gameLogic.ts         # Pure game logic (testable, no React deps)
├── components/
│   ├── BoardSquare/         # Interactive board square (clickable)
│   ├── TurnIndicator/       # Static turn display squares
│   ├── GameBoard/           # 3x3 grid composition
│   ├── GameControls/        # Mode/difficulty/undo/new-game controls
│   ├── HistoryPanel/        # Move history sidebar
│   ├── Modal/               # Winner/draw overlay with scores
│   └── NewGameButton/       # Reusable new game button
└── index.css                # Global styles + CSS custom properties
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Preview production build
npm run preview
```

## 🎮 Game Modes

| Mode | Description |
|------|-------------|
| **Player vs Player** | Two human players alternate turns |
| **Player vs AI** | Human (X) plays against computer (O) |

### AI Difficulty Levels

| Level | Behavior |
|-------|----------|
| **Easy** | Random moves |
| **Medium** | 50% optimal (minimax), 50% random |
| **Hard** | Always optimal (minimax) |

## ♿ Accessibility Features

- **Keyboard Navigation**: Tab to squares, Enter/Space to play
- **Screen Readers**: Live region announcements for turn changes, wins, draws
- **ARIA Labels**: Descriptive labels on all interactive elements
- **Focus Management**: Visible focus indicators, logical tab order
- **Semantic HTML**: Proper roles (grid, button, dialog, list)
- **Color Contrast**: WCAG AA compliant colors

## 🔧 Key Improvements from Original

### Bug Fixes
- Fixed state mutation bug in `GameContext` (line 50): was `const s = squares` → now `const s = [...squares]`

### Code Quality
- **TypeScript migration**: Full strict typing for all components, context, and utilities
- **Separation of concerns**: Game logic extracted to pure functions in `utils/gameLogic.ts`
- **Performance**: `React.memo`, `useCallback`, `useMemo` on all components
- **Component split**: `Square` → `BoardSquare` (interactive) + `TurnIndicator` (display-only)

### New Features
| Feature | Implementation |
|---------|---------------|
| AI Opponent | Minimax algorithm with alpha-beta pruning concept |
| Score Tracking | Persisted in context + localStorage |
| Undo Move | History stack with full state restoration |
| Game History | Sidebar with move previews using static BoardSquares |
| Persistence | localStorage sync via useEffect |
| Accessibility | Comprehensive ARIA + keyboard support |

### Styling Improvements
- CSS Custom Properties for theming (`--bg-primary`, `--accent-primary`, etc.)
- Dark/Light mode ready (data-theme attribute)
- Responsive breakpoints (480px, 768px)
- Improved animations with Framer Motion
- Consistent spacing and border-radius scale

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check + production build |
| `npm run lint` | ESLint with TypeScript rules |
| `npm run preview` | Preview production build locally |

## 📄 License

MIT License - feel free to use for learning or projects!
