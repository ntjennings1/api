# Function to stop host.
function down(){

  lsof -i :8081 | awk 'NR ==2 {print $2}' | xargs kill -9
}

down