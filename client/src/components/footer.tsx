export function Footer() {
  return (
    <footer className="robco-footer">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center">
          <span className="text-xs">RBOS_v7.6.1.0</span>
        </div>
        <div className="flex items-center">
          <span className="text-terminal-accent mr-2">STATUS:</span>
          <span className="crt-flicker">TERMINAL OPERATIONAL</span>
        </div>
        <div className="flex items-center">
          <span className="text-xs">MEM: 64K</span>
        </div>
      </div>
    </footer>
  );
}
