const mongoose = require('mongoose');
const uri = 'mongodb+srv://erhangursu:Eymen226@eticaretdb.zlesnt7.mongodb.net/?retryWrites=true&w=majority';
const connection = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Bağlantısı Başarılı.'))
    .catch(err => console.log('MongoDb Bağlantısı Başarısız. Hata: ', err.message));

module.exports = connection;








