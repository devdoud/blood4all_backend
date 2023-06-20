

import { prisma } from "../../../../lib/prismadb"

export default async function handler(req, res) {

    const method = req.method;

    switch (method) {
        case 'GET':
            
            break;
        case 'POST':
            
            //quand la requette ne contient aucune data
            if(!req.body) res.status(404).json({ message: "votre requette ne contient aucune information" });
            
            //je veux pouvoir ajouter maintenant le type de produit recherche
            //Globule rouge
            //Plasma frais congelé
            //Plasma albumine
            //Concentrés de plaquettes
            //Cryoprecipitate
            const {groupeSanguin, nombrePoches, productType} = req.body; // il est necessaire que j'ajoute ici le type de sang
            
            // [
            //     ["Nom banque", [x, y], ["O-", "O+", "B-", "B+", "A-", "A+", "AB-", "AB+"], [5, 8, 7, 8, 9, 9], ['plasma', 'congele']]
            // ],

            try {

                const infos = await prisma.bloodBank.findMany({
                    select: {
                        nameBankBlood: true,
                        lagitude: true,
                        longitude: true,
                        blood: {
                            select: {
                                bloodGroupe: true,
                                quantity: true,
                                productType: true,
                                //Je veux aussi recupere le type de produit
                            }
                        }
                    }
                });

                // Mettre le resultat au format recherche
                // ici la liste de sang contenue dans une banque de sang est infos.blood
                
                let bloodData = infos.map(
                    (info) => {
                        let resultats = [];
                        let coordonnee = [];
                        let allBloodGroupeInBank = [];
                        let allBloodQuantityInBank = [];
                        //creer une nouvelle liste pour recuperer les type de sang

                        let allBloodProductType = [];

                        resultats.push(info.nameBankBlood);
                        coordonnee.push(info.lagitude);
                        coordonnee.push(info.longitude);
                        resultats.push(coordonnee);

                        
                        let newListe = info.blood.reduce(
                            (acc, obj) => {
                                let existant = acc.find(item => item.bloodGroupe === obj.bloodGroupe)
                                if(existant) {
                                    existant.quantity += obj.quantity;
                                } else {
                                    acc.push({bloodGroupe: obj.bloodGroupe, quantity: obj.quantity, productType: obj.productType })
                                }

                                return acc;
                            }, []
                        );

                        console.log(newListe)

                        newListe.map(
                            (item) => {
                                allBloodGroupeInBank.push(item.bloodGroupe);
                                allBloodQuantityInBank.push(item.quantity);
                                allBloodProductType.push(item.productType);
                            }
                        )

                        console.log(allBloodGroupeInBank)
                        console.log(allBloodQuantityInBank)
                        console.log(allBloodProductType)

                        resultats.push(allBloodGroupeInBank)
                        resultats.push(allBloodQuantityInBank)
                        resultats.push(allBloodProductType)
                        
                        return resultats;
        
                    }
                
                )

                console.log(bloodData)
           
                //predefinir les coordonnees
                let points = [
                    [0, 1],
                    [1, 7],
                    [-8, 15],
                    [12, 17],
                    [15, -4],
                    [-1, -1],
                    [5, 9],
                    [10, 10],
                    [3, 17],
                    [-5, 14]
                ]

                // creer quelques listes de groupes sanguin
                let groupeSanguins = [
                    ["O-", "O+", "B-", "B+", "A-", "A+", "AB-", "AB+"],
                    ["B+", "A-", "A+", "AB-", "AB+"],
                    ["O-", "O+", "B-", "B+", "A+", "AB-", "AB+"],
                    ["O-", "O+", "B-", "AB-"],
                    ["O-", "A+", "AB-", "AB+"],
                    ["O-", "O+", "B-", "B+", "A-", "A+",],
                    ["AB-", "AB+"],
                    ["O-", "O+", "A-", "A+", "AB+"],
                    ["O-", "O+", "B-", "AB-", "AB+"],
                    ["O-", "B-", "B+", "A-",  "AB-"],
                ]

                //creer quelques coordonnees pre-definir.
                let maxX = 20
                let maxY = 20

                let x = 5;
                let y = 5;

                //creer une fonction qui permettra de generer une position de facon alleatoire.
                const genRandomPos = () => {
                    x = getRandomInt(0, 20)
                    y = getRandomInt(0, 20)

                    return ([x,y])
                }

                //la fonction qui permet de generer un entier entre 0 et 20
                const getRandomInt = (min, max) => {
                    min = Math.ceil(min);
                    max = Math.floor(max);
                    return (Math.floor(Math.random() * (max - min + 1)) + min)
                }

                //la fonction qui va effectuer le calcul de la distance entre le medecin et les banques de sang
                const compareDistance = (d1, d2) => {
                    return d1[1] - d2[1];
                }

                const definePerimeterAndMakeSearch = (x, y, radius, search, dataOfDB) => {
                    let founds = []
                    let searchedBlood = search[0]
                    let searchNb = search[1]
                    //Le type de produit sanguin

                    let searchProductType = search[2]

                    for (let i = 0; i < dataOfDB.length; i++) {
                        const bankPosition = dataOfDB[i][1]
                        const bankGroups = dataOfDB[i][2]
                        const bankGroupsNbs = dataOfDB[i][3]
                        //je vais ajouter le tableau comme quatrieme element de datadb
                        const bankGroupsProType = dataOfDB[i][4]

                        const distance = Math.sqrt(Math.pow(bankPosition[0] - x, 2) + Math.pow(bankPosition[1] - y, 2))

                        if (distance <= radius) {
                            const bloodPos = dataIsInArray(bankGroups, searchedBlood)
                            if (bloodPos != -1 && bankGroupsNbs[bloodPos] >= searchNb && bankGroupsProType[bloodPos] == searchProductType) {
                                founds.push([dataOfDB[i][0], distance])
                            }
                        }
                    }
                    founds.sort(compareDistance)
                    let found = []
                    // for (let i = 0; i < founds.length; i++)
                    // {
                    //     found.push(founds[i][0])
                    // }
                    return (founds)
                }

                // ...
                const dataIsInArray = (array, data) => {
                    for (let i = 0; i < array.length; i++)
                    {
                        if (data === array[i])
                            return (i)
                    }
                    return (-1)
                }

                // ... 
                const makeSearchByRadius = (dataOfDB, search, radius = 1) => {
                    // let radius = 1
                    // Distance maximale de recherche donnée par l'hypothenus de + ou - fois 2 dans le cas où les valeurs sont identiques
                    let maxDistance = (Math.sqrt(Math.pow(maxX, 2) + Math.pow(maxY, 2))) * 2
                    let allFound = []

                    for (radius; radius <= maxDistance; radius++) {
                    let found = definePerimeterAndMakeSearch(x, y, radius, search, dataOfDB)
                    console.log(`Recherche dans un rayon de ${radius}:`)
                    // console.log(found)
                    allFound = [...allFound, ...found]
                    }
                        // Au cas où la distance maximale est une valeur décimale, faire une
                        // dernière recherche dans un rayon prenant en compte la distance de
                        // la partie décimale
                    if (maxDistance % 1 != 0)
                    {
                        let found = definePerimeterAndMakeSearch(x, y, radius, search, dataOfDB)
                         console.log(`Recherche dans un rayon de ${radius}:`)
                        // console.log(found)
                        allFound = [...allFound, ...found]
                    }

                    let sorted = []
                    return (allFound)
                
                }

                function removeDuplicateResults(results)
                {
                    let re = []
                    if (results.length > 0) re.push(results[0])
                    let i = 1
                    for (i; i < results.length; i++) {
                        
                       let found = false
                        
                        for (let j = 0; j < re.length; j++) {
                            if (re[j][0] == results[i][0]) {
                                found = true
                                break
                            }
                        }
                        if (!found) re.push(results[i])
                    }
                    return re
                }

                // function start() {
                //     // genRandomPos()
                //     // Les données de recherche du médecin
                //     let search = ["AB-", 2]
                //     showPosition()
                //     const allFound = makeSearchByRadius(dataBaseDatas, search)
                //     console.log(allFound)
                // }

                // Les donnees envoyees par le medecin 
                let search = [];
                search.push(groupeSanguin);
                search.push( (nombrePoches * 300) );
                search.push(productType);
                //Je veux pouvoir egalement permettre au medecin de rechercher le type de sang
                
                const allFound = removeDuplicateResults(makeSearchByRadius(bloodData, search))
                

                res.status(200).json(allFound);
                       
            } catch (error) {
                console.log(error)
                res.status(404).json({message: 'desole la recherche ne peut aboutir'});
            } finally {
                await prisma.$disconnect;
            }

            break;
    
        default:
            res.status(401).json({message: `La methode ${methode} n'est pas autorisee !`});
            break;
    }

}