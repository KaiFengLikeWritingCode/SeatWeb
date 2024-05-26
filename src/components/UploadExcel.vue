<template>
  <div class="upload-container">
    <h2>Upload Seating Chart</h2>
    <input type="file" @change="handleFileUpload" />
    <button @click="uploadFile">Upload</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      file: null,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    async uploadFile() {
      if (!this.file) {
        alert('Please select a file first');
        return;
      }

      const formData = new FormData();
      formData.append('file', this.file);

      try {
        await axios.post('http://localhost:8080/api/seats/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        alert('File uploaded successfully');
      } catch (error) {
        console.error('Failed to upload file:', error);
        alert('Failed to upload file');
      }
    }
  }
};
</script>

<style scoped>
.upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f0f2f5;
}

h2 {
  margin-bottom: 20px;
}

input {
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}
</style>
