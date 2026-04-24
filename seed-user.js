import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://mernuser:TodoList%40123@todo.jtjvyzi.mongodb.net/marhabadesigner?retryWrites=true&w=majority&appName=marhabadesigner"; 

async function seed() {
  try {
    console.log("--- Connecting to MongoDB ---");
    await mongoose.connect(MONGODB_URI);

    const UserSchema = new mongoose.Schema({
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      role: { type: String, default: 'admin' }
    }, { timestamps: true });

    const User = mongoose.models.User || mongoose.model('User', UserSchema, 'users');

    const adminEmail = 'admin@marhaba.com';
    const exists = await User.findOne({ email: adminEmail });

    if (!exists) {
      await User.create({
        email: adminEmail,
        password: 'admin123', 
        role: 'super_admin'
      });
      console.log("\x1b[32m%s\x1b[0m", "✔ SUCCESS: Default admin created (admin@marhaba.com / admin123)");
      console.log("The 'users' collection is now live in your Atlas dashboard.");
    } else {
      console.log("\x1b[33m%s\x1b[0m", "ℹ Info: Admin already exists in the database.");
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("\x1b[31m%s\x1b[0m", "✖ Error seeding user:", err.message);
    process.exit(1);
  }
}

seed();
