import React, { useState, useEffect } from 'react';

function UpdateUserForm({ onClose, onOpen }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (onOpen) {
      onOpen(setUser);
    }
  }, [onOpen]);

  // ...
}

export default UpdateUserForm;