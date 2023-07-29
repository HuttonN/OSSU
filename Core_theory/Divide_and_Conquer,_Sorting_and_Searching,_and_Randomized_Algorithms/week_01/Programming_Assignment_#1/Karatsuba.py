def KaratsubaMultiply(x, y):
    if len(str(x)) == 1 or len(str(y)) == 1:
        return x * y
    else:
        n = max(len(str(x)), len(str(y)))
        n_by_2 = n // 2

        a = x // (10 ** n_by_2)
        b = x % (10 ** n_by_2)
        c = y // (10 ** n_by_2)
        d = y % (10 ** n_by_2)

        ac = KaratsubaMultiply(a,c)
        bd = KaratsubaMultiply(b,d)
        ad_bc = KaratsubaMultiply(a+b, c+d) - ac - bd

        answer = (ac * (10**(2*n_by_2))) + (ad_bc * (10**n_by_2)) + bd
        return answer
