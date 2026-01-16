const UserBehaviorContext = createContext();

export const UserBehaviorProvider = ({ children }) => {
  const [viewed, setViewed] = useState([]);
  const [cart, setCart] = useState([]);

  const addView = (id) =>
    setViewed(prev => [...new Set([...prev, id])]);

  return (
    <UserBehaviorContext.Provider
      value={{ viewed, cart, addView }}
    >
      {children}
    </UserBehaviorContext.Provider>
  );
};
