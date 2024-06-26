<template>
  <div class="container">
    <h1>Class Seating Chart</h1>
    <form @submit.prevent="initializeSeats" class="form-inline">
      <label for="rows">Rows:</label>
      <input type="number" id="rows" v-model="rows" required />
      <label for="columns">Columns:</label>
      <input type="number" id="columns" v-model="columns" required />
      <button type="submit">Initialize Seats</button>
    </form>
    <div>
      <h2>Upload Seating Chart Excel</h2>
      <input type="file" @change="handleFileUpload" />
      <button @click="uploadFile">Upload</button>
    </div>
    <div v-if="seats.length > 0" class="seating-chart">
      <table>
        <tbody>
        <tr v-for="rowNum in maxRow" :key="rowNum">
          <td v-for="colNum in maxColumn" :key="colNum">
            <div
                v-for="seat in seats"
                v-if="seat.seatRow === rowNum - 1 && seat.seatColumn === colNum - 1"
                :key="seat.id"
                :style="{ backgroundColor: seat.occupied ? 'red' : 'white' }"
                class="seat"
            >
              <img
                  v-if="seat.occupied"
                  :src="seat.occupied ? '/images/occupied_seat.png' : '/images/seat.png'"


                  @click="seat.occupied && addPoints(seat.id)"
                  :alt="'Seat ' + (seat.seatRow + 1) + '-' + (seat.seatColumn + 1)"
                  class="seat-image"
              />
              <div class="seat-info">
                {{ seat.name + " " + seat.points}}
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <h2 v-if="occupiedSeats.length > 0">Ranking</h2>
    <div v-if="occupiedSeats.length > 0" class="ranking">
      <table>
        <thead>
        <tr>
          <th>Rank</th>
          <th>Seat</th>
          <th>Points</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(seat, index) in rankedOccupiedSeats" :key="seat.id" :class="{ 'top-rank': index < topRankCount }">
          <td>{{ index + 1 }}</td>
          <td>Row: {{ seat.seatRow + 1 }} Col: {{ seat.seatColumn + 1 }} Name: {{ seat.name }}</td>
          <td>{{ seat.points }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import SeatService from '@/services/SeatService';

export default {
  data() {
    return {
      seats: [],
      rows: 0,
      columns: 0,
      maxRow: 0,
      maxColumn: 0,
      file: null,
    };
  },
  computed: {
    occupiedSeats() {
      return this.seats.filter(seat => seat.occupied);
    },
    rankedOccupiedSeats() {
      return this.occupiedSeats.slice().sort((a, b) => b.points - a.points);
    },
    topRankCount() {
      return Math.ceil(this.rankedOccupiedSeats.length * 0.3);
    }
  },
  methods: {
    fetchSeats() {
      SeatService.getAllSeats().then((response) => {
        this.seats = response.data;
        this.maxRow = Math.max(...this.seats.map((seat) => seat.seatRow)) + 1;
        this.maxColumn = Math.max(...this.seats.map((seat) => seat.seatColumn)) + 1;
      });
    },
    initializeSeats() {
      SeatService.initializeSeats(this.rows, this.columns).then(() => {
        this.seats = [];
        this.fetchSeats();
      });
    },
    addPoints(id) {
      SeatService.addPoints(id).then(() => {
        this.fetchSeats();
      });
    },
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
        await SeatService.uploadFile(formData);
        this.fetchSeats();
        alert('File uploaded successfully');
      } catch (error) {
        console.error('Failed to upload file:', error);
        alert('Failed to upload file');
      }
    },
  },
  mounted() {
    this.fetchSeats();
  },
};
</script>

<style>
body {
  background-image: url('/images/background.jpg');
  background-size: cover;
  font-family: Arial, sans-serif;
  color: #333;
  text-align: center;
  margin: 0;
  padding: 0;
}

.container {
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  margin: 20px auto;
  border-radius: 8px;
  width: 80%;
  max-width: 1200px;
}

h1 {
  color: #2c3e50;
  margin-bottom: 20px;
}

form {
  margin-bottom: 20px;
}

.form-inline label {
  margin: 5px;
}

.form-inline input {
  margin: 5px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.form-inline button {
  margin: 5px;
  padding: 8px 12px;
  background-color: #3498db;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.form-inline button:hover {
  background-color: #2980b9;
}

.seating-chart {
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

table,
th,
td {
  border: 1px solid #ddd;
}

th,
td {
  padding: 8px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
}

.seat {
  padding: 10px;
  border-radius: 4px;
  margin: 5px;
  position: relative;
}

.seat-image {
  width: 50px;
  height: 50px;
  cursor: pointer;
}

.seat-info {
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  text-align: center;
}

.top-rank {
  background-color: yellow;
}
</style>
