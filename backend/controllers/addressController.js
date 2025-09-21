const Address = require('../models/Address');

// Get all addresses for a user
exports.getUserAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user.id }).sort({ isDefault: -1, createdAt: -1 });
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get address by ID
exports.getAddressById = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    // Check if the address belongs to the user
    if (address.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(address);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create new address
exports.createAddress = async (req, res) => {
  try {
    const { name, street, city, state, zipCode, country, phone, isDefault } = req.body;
    
    const address = new Address({
      user: req.user.id,
      name,
      street,
      city,
      state,
      zipCode,
      country,
      phone,
      isDefault: isDefault || false
    });

    const savedAddress = await address.save();
    res.status(201).json(savedAddress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update address
exports.updateAddress = async (req, res) => {
  try {
    const { name, street, city, state, zipCode, country, phone, isDefault } = req.body;
    
    const address = await Address.findById(req.params.id);
    
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    // Check if the address belongs to the user
    if (address.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    address.name = name || address.name;
    address.street = street || address.street;
    address.city = city || address.city;
    address.state = state || address.state;
    address.zipCode = zipCode || address.zipCode;
    address.country = country || address.country;
    address.phone = phone || address.phone;
    address.isDefault = isDefault !== undefined ? isDefault : address.isDefault;

    const updatedAddress = await address.save();
    res.json(updatedAddress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete address
exports.deleteAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    // Check if the address belongs to the user
    if (address.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Prevent deletion of default address
    if (address.isDefault) {
      return res.status(400).json({ message: 'Cannot delete default address' });
    }

    await Address.findByIdAndDelete(req.params.id);
    res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Set default address
exports.setDefaultAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    // Check if the address belongs to the user
    if (address.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Update all addresses to not default
    await Address.updateMany(
      { user: req.user.id },
      { isDefault: false }
    );

    // Set this address as default
    address.isDefault = true;
    await address.save();

    res.json({ message: 'Default address updated successfully', address });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};