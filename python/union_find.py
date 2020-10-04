class UnionFind:
    def __init__(self, size):
        self.parent = [-1 for x in range(size)]

    def root(self, v):
        if self.parent[v] < 0:
            return v
        else:
            self.parent[v] = self.root(self.parent[v])
            return self.parent[v]

    def sameSet(self, v, u):
        return self.root(v) == self.root(u)

    def merge(self, v, u):
        v = self.root(v)
        u = self.root(u)

        if v == u: 
            return

        if self.parent[u] < self.parent[v]:
            aux = self.parent[u]
            self.parent[u] = self.parent[v]
            self.parent[v] = aux

        self.parent[v] += self.parent[u]
        self.parent[u] = v

uf = UnionFind(5)
uf.merge(0,4)
print(uf.parent)
print(uf.sameSet(0,4))