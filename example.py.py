import pickle

def Ler() :
  with open("multas.bin","rb") as multas:
    m=pickle.load(multas) #motoristas
    v=pickle.load(multas) #veiculos
    i=pickle.load(multas) #infracoes
    n=pickle.load(multas) #naturezas
    l=[m,v,i,n]
    multas.close()
  return l

def FiltrarInfracoes() :
  pass

def CalcularPontos() :
  pass

def ConsultarBlitz() :
  pass

def CadM(m) : #cadastrar novo motorista
  n = input("Digite o nome do motorista a ser cadastrado : ")
  cnh = input("Digite a CNH do motorista a ser cadastrado :")
  d = input("Digite a data de vencimento da CNH (no formato dd/mm/aaaa) : ")
  dv = (int(d[0:2]),int(d[3:5]),int(d[6::])) #formatando devidamente
  if cnh not in m :
    m[cnh] = (n, dv)
  else :
    print("Esse CNH ja esta cadatrado, portanto voce sera redimencionado ao menu")
  return m

def CadV(v) : # cadastrar novo veiculo
  p = input("Digite a placa do veiculo a ser cadastrado : ")
  cnh = input("Digite a CNH do proprietario do veiculo :")
  m = input("Digite o modelo do veiculo : ")
  c = input("Digite a cor de veiculo : ")
  if p not in v :
    v[p] = (cnh, m, c)
  else :
    print("Esse veiculo ja esta cadatrado, portanto voce sera redimencionado ao menu\n")
  return v

#ERRO
def Altp(m,v) : # alterar proprietario de um veiculo
  p = input("Digite a placa do veiculo a ser alterado : ")
  cnh = input("Digite a CNH do novo proprietario do veiculo :")
  if p in v : #condicao se a placa existe
    if cnh in m: #condicao se o motorista existe
      vp=v[p]
      v[p] = (cnh, vp[1], vp[2])
      print("Dados alterados com sucesso. ")
    else :
      print("Esse motorista nao este cadatrado, portanto voce sera redimencionado ao menu\n")
  else :
    print("Esse veiculo nao esta cadatrado, portanto voce sera redimencionado ao menu\n")

def CadI(m,v,i) :
  condI = True #condicional, se tudo esta correto
  auxi = i[::-1] #variavel para ajudar a encontrar o numero da ultima infracao
  ui = auxi[0][0] #numero da ultima infracao cadastrada
  nt = ui+1 #numero da transacao
  d = input("Digite a data em que oocorreu a infracao (no formato dd/mm/aaaa) : ")
  do = (int(d[0:2]),int(d[3:5]),int(d[6::])) #formatando
  p = input("Digite a placa do veiculo envolvido : ")
  if p in v:
    n = int(input("Informe a natureza da infracao :\nDigite 1 para infracao leve\n       2 para media\n       3 para grave\n       4 para gravissima "))
    if n == 1 :
      n = "Leve"
    elif n == 2 :
      n = "Media"
    elif n == 3 :
      n = "Grave"
    elif n == 4 :
      n = "Gravissima"
    if type(n) != int :
      i.append((nt,do,p,n))
      print (i)
    else :
      condI = False
  else :
    condI = False

  if condI :
    print("Tudo ocorreu corretamente, voce voltar ao menu\n")
  else :
    print("Ocorreu um erro, a operacao nao foi efetuada, voce voltara ao menu")
  return i

def Menu(l) :
  aux1=True
  while aux1:
    o=(input("Seja bem vindo\n por favor selecione uma das opcoes a seguir digitando o numero associado\n1. Cadastrar um novo motorista\n2. Cadastrar um novo veiculo\n3. Alterar proprietario de um veiculo\n4. Cadastrar uma nova infracao\n0. Sair do menu\n"))
    if o == "1" :
      l[0] = CadM(l[0])
    elif o == "2" :
      l[1] = CadV(l[1])
    elif o == "3" :
      l[1] = Altp(l[0],l[1])
    elif o == "4" :
      l[2] = CadI(l[0],l[1],l[2])
    elif o == "0" :
      aux1 = False
    else :
      print("O numero digitado nao e valido, tente novamente")

def Salvar(l) :
  with open("multas.bin","wb") as multas:
    pickle.dump(l[0],multas) #motoristas
    pickle.dump(l[1],multas) #veiculos
    pickle.dump(l[2],multas) #infracoes
    pickle.dump(l[3],multas) #naturezas
    multas.close()

def main() :
  lista=Ler()
  aux=True
  while aux :
    Menu(lista)
    cond = input("Se deseja voltar ao menu digite 1, caso o contrario o programa sera fechado") #condicional
    if cond != "1" :
     aux = False
  Salvar(lista)
  return 0

if __name__ == "__main__":
  main()
