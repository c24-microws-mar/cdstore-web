export default {
  getAllCds: () => { 
    return new Promise(function(resolve, reject) {
      const testData = [
        {
          name: "CD1",
          price: 12.99
        },
        {
          name: "CD2",
          price: 4.99
        }
      ];

      resolve(testData);
    }); 
  }
};
