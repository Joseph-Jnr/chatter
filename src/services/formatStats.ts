const formatStats: any = (value: any) => {
  if (value >= 1000000) {
    return value / 1000000 + 'm' // Display 10m instead of 10,000,000
  } else if (value >= 1000) {
    return value / 1000 + 'k' // Display 10K instead of 10,000
  } else {
    return value
  }
}

export default formatStats
