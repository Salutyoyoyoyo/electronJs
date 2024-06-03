const information = document.getElementById('info');
information.innerText = `Cette App utilise chrome ${version.chrome()}, node ${version.node}, electron ${version.electron()}`;