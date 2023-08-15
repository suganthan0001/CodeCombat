function showAbout() {
  hideAllSections();
  document.getElementById('about-section').style.display = 'block';
}

function showCreditHistory() {
  hideAllSections();
  document.getElementById('credit-history-section').style.display = 'block';
}

function showPurchaseHistory() {
  hideAllSections();
  document.getElementById('purchase-history-section').style.display = 'block';
}

function hideAllSections() {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.style.display = 'none';
  });
}
const jsonData = {
  customerId: 6666,
  name: 'Suganthan S',
  age: 19,
  dob: '11/07/2004',
  address: 'Chennai, 600119',
  typeOfBusiness: 'Transport Business',
  dateOfRegistered: '11/11/2011',
  mobileNum: 9486507050,
  accountType: 'Saving Account',
  accountBalance: 50000,
  fdLink: 'SB-578483787',
  totalBalance: '1000000',
  nomination: 'Vithya S',
  transactions: [
    {
      date: '11/07/2023',
      description: 'Purchase',
      ref: 2345634,
      withdrawals: 200,
      balance: 500,
      
    },
    {
      date: '13/07/2023',
      description: 'For Friend',
      ref: 2345635,
      withdrawals: 300,
      balance: 200,
      
    }
  ],
  __v: 0
};

const transactions = jsonData.transactions;

const dates = transactions.map(transaction => transaction.date);
const withdrawals = transactions.map(transaction => transaction.withdrawals);
const deposits = transactions.map(transaction => transaction.balance - transaction.withdrawals);

const ctx = document.getElementById('transactionChart').getContext('2d');
const transactionChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: dates,
    datasets: [
      {
        label: 'Withdrawals',
        data: withdrawals,
        backgroundColor: 'rgba(255, 99, 132, 0.5)', 
      },
      {
        label: 'Deposits',
        data: deposits,
        backgroundColor: 'rgba(75, 192, 192, 0.5)', 
      }
    ]
  },
  options: {
    animation: {
      duration: 1000, 
      easing: 'easeOutQuad', 
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});



