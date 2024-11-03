const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const Stripe = require('stripe');

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080

//mongodb connection
console.log(process.env.MONGODB_URI);
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log('MongoDB connection error:', err));


//schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    confirmPassword: String,
    image: String
})

//model
const userModel = mongoose.model('user', userSchema)


//api
app.get('/', (req, res) => {
    res.send('Server is running')
});

//signup
app.post('/signup', async (req, res) => {
    try {
        // console.log(req.body);
        const { email } = req.body;

        // Using async/await instead of callback
        const result = await userModel.findOne({ email: email });

        if (result) {
            // If email is already registered
            res.send({ message: "Email id is already registered", alert: false });
        } else {
            // Creating and saving the user
            const data = new userModel(req.body);
            await data.save();
            res.send({ message: "Register successful", alert: true });
        }
    } catch (error) {
        // Catching and sending errors if any
        console.error(error);
        res.status(500).send({ message: "Error during registration" });
    }
});

//login
app.post('/login', async (req, res) => {
    try {
        // console.log(req.body);

        const { email } = req.body;

        const result = await userModel.findOne({ email: email });
        if (result) {
            const dataSend = {
                _id: result._id,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                image: result.image
            }
            console.log(dataSend);
            res.send({ message: "Successfully logged in", alert: true, data: dataSend });
        } else {
            res.send({ message: "Invalid email or password", alert: false });
        }

    } catch (error) {

    }

})


//product section
const productSchema = mongoose.Schema({
    name: String,
    category: String,
    image: String,
    price: Number,
    description: String,
});

const productModel = mongoose.model('product', productSchema);

//save product in database
//api
app.post('/uploadProduct', async (req, res) => {
    // console.log(req.body);
    const data = await productModel(req.body);
    const dataSave = await data.save();
    res.send({ message: "Uploaded successfully" });
})

//
app.get('/product', async (req, res) => {
    const data = await productModel.find({});
    res.send(JSON.stringify(data));
})

// payment gateway
console.log(process.env.STRIPE_SECRET_KEY);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
app.post('/checkout-payment', async (req, res) => {
    // console.log(req.body);

    try {
        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [{ shipping_rate: 'shr_1QH4DN02BQr6ZSp7YXJCVogp' }],

            line_items: req.body.map((item) => {
                return {
                    price_data: {
                        currency: "aud",
                        product_data: {
                            name: item.name,
                            // images: [item.image]
                        },
                        unit_amount: item.price * 100
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                    },
                    quantity: item.qty,
                }
            }),

            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`
        }

        const session = await stripe.checkout.sessions.create(params);
        res.status(200).json(session.id);
    } catch (error) {
        res.status(error.statusCode || 500).json(error.message);
    }

})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));