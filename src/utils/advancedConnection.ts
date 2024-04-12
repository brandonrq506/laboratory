export const advancedConnection = (room: string) => {
  return {
    connect() {
      console.log(`✅ Connecting to "${room}" room`);
    },
    disconnect() {
      console.log(`❌ Disconnecting from "${room}" room`);
    },
  };
};
