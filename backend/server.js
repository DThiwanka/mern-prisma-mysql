const express = require("express");
const os = require("os");

const app = express();
const PORT = process.env.PORT || 5000;

function getNetworkDetails() {
  const networkInterfaces = os.networkInterfaces();
  const macAddresses = [];
  const ipAddresses = [];

  for (const interfaceName in networkInterfaces) {
    const networkDetails = networkInterfaces[interfaceName];
    networkDetails.forEach(detail => {
      if (!detail.internal && detail.family === "IPv4") {
        macAddresses.push(detail.mac);
        ipAddresses.push(detail.address);
      }
    });
  }

  return {
    macAddresses,
    ipAddresses,
  };
}

// API endpoint to return network details
app.get("/api/network-details", (req, res) => {
  const networkDetails = getNetworkDetails();
  res.json(networkDetails);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
