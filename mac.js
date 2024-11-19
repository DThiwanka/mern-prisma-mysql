const os = require("os");

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
        ipAddresses
    };
}

// Example usage
const { macAddresses, ipAddresses } = getNetworkDetails();
console.log("MAC Addresses: ", macAddresses);
console.log("IPv4 Addresses: ", ipAddresses);
