数据库初始化:

注意:mongoose对应的表必须是Schema名字的复数(加s或者es)!!!

省市区三级数据
mongoimport --db test --collection provinces --file E:\soofruit\static\json\province.json  --jsonArray
mongoimport --db test --collection cities --file E:\soofruit\static\json\city.json  --jsonArray
mongoimport --db test --collection districts --file E:\soofruit\static\json\district.json  --jsonArray