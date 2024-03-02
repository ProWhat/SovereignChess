




		
		
		
		
		var colP1CH = 0;
		var colP2CH = 1;
		
		var masCH = new Array(tileX);			// Массив клеток для чекера
		 
		for (i = 0; i < masCH.length; i++)
		{
			masCH[i] = new Array(tileY);
		}
		
		var masFCH = new Array(tileX);			// Массив фигур для чекера
		 
		for (i = 0; i < masFCH.length; i++)
		{
			masFCH[i] = new Array(tileY);
		}
		
		var masConCH = new Array(14);			// Массив цветных полей для чекера
		
		function newConCH(elCH, kCH)			// Функция реализующая изменения после перемещения фигуры на цветное поле для чекера
		{
			masConCH[elCH] = kCH;
			
			if (elCH == colP1CH || elCH == colP2CH)	// Если клетка цвета фигур одного из королей игрока, не передаем контроль
				return;
			
			for (var i = 0; i < tileX; i++)
			{
				for (var j = 0; j < tileY; j++)
				{
					if (("" + masFCH[j][i])[1] + ("" + masFCH[j][i])[2] == elCH)
					{
						masFCH[j][i] = ("" + masFCH[j][i])[0] + ("" + masFCH[j][i])[1] + ("" + masFCH[j][i])[2] + kCH;
						
						if (masCH[j][i] < 12 && masCH[j][i] != colP1CH && masCH[j][i] != colP2CH)
						{
							newConCH(masCH[j][i], nowH);
						}
					}
				}
			}
		}
		
		function lostConCH(elCH, kCH)			// Функция реализующая изменения после ухода фигуры с цветного поля для чекера
		{
			if (kCH == 0)
				masConCH[elCH] = 0;
			
			if (elCH == colP1CH || elCH == colP2CH)	// Если клетка цвета фигур одного из королей игрока, не забираем контроль
				return;
			
			for (var i = 0; i < tileX; i++)
			{
				for (var j = 0; j < tileY; j++)
				{
					if (("" + masFCH[j][i])[1] + ("" + masFCH[j][i])[2] == elCH)
					{
						masFCH[j][i] = ("" + masFCH[j][i])[0] + ("" + masFCH[j][i])[1] + ("" + masFCH[j][i])[2] + 0;
						
						if (masCH[j][i] < 12 && masCH[j][i] != colP1CH && masCH[j][i] != colP2CH)
						{
							lostConCH(masCH[j][i], 1);
						}
					}
				}
			}
		}
		
		function checker(fX, fY, fXn, fYn)		// Функция проверяющая наличие короля на пути фигуры
		{
			for (var i = 0; i < tileX; i++)			// Копируем массивы	(И тут начались проблемы...)
			{
				for (var j = 0; j < tileY; j++)
				{
					masCH[j][i] = mas[j][i].index;
					masFCH[j][i] = masF[j][i].index;
				}
			}
			
			colP1CH = colP1;
			colP2CH = colP2;
			
			for (var i = 0; i < 14; i++)
			{
				masConCH[i] = masCon[i];
			}
			
			masFCH[fXn][fYn] = masFCH[fX][fY];	// Производим перемещение фигуры
			masFCH[fX][fY] = masCH[fX][fY];		// Очищаем клетку с которой ушла фигура
			
			var elemCH = masCH[fXn][fYn];
			var lastElemCH = masCH[fX][fY];
			
			if (elemCH < 12)			// Встаем на цветное поле
			{
				newConCH(elemCH, nowH);
			}
			
			if (lastElemCH < 12 && elemCH.index != lastElemCH.index)		// Уходим с цветного поля
			{
				lostConCH(lastElemCH, 0);
			}
			
			// ******* TEST *******
			
			for (var ncCH = 0; ncCH < 12; ncCH++)		// Сначало забираем контроль со всех цветных фигур
			{
				var tileConCH = 0;
				
				for (var i = 0; i < tileX; i++)
					for (var j = 0; j < tileY; j++)
						if (masCH[j][i] < 12 && masCH[j][i] == ncCH)
							tileConCH = masCH[j][i];
				
				lostConCH(tileConCH, 0);
			}
			
			for (var ncCH = 0; ncCH < 12; ncCH++)		// Затем возращаем контроль для цветных фигур, если они захвачены
			{
				for (var i = 0; i < tileX; i++)
					for (var j = 0; j < tileY; j++)
						if (masCH[j][i] < 12 && masCH[j][i] != masFCH[j][i] && masCH[j][i] == ncCH)
							if (("" + masFCH[j][i])[3] == 1)
								newConCH(masCH[j][i], 1);
							else if (("" + masFCH[j][i])[3] == 2)
								newConCH(masCH[j][i], 2);
			}
			
			// ******* TEST *******
			
			var king = 0;
			var tX = 0;
			var tY = 0;
			
			var figCol = 0;
			
			for (var i = 0; i < tileY; i++)			// Определяем короля и его координаты
			{
				for (var j = 0; j < tileX; j++)
				{
					var hh = masFCH[j][i];
					
					if(("" + masFCH[j][i])[0] == 6 && ("" + masFCH[j][i])[3] == nowH)
					{
						king = masFCH[j][i];
						tX = j;
						tY = i;
						figCol = masCH[j][i];
					}
				}
			}
			
			var figNum = ("" + king)[0];				// Запоминаем характеристики фигуры
			var figCtr = ("" + king)[3];
			
			var enemy = 0;
			
			if (nowH == 1)		// Запоминаем номер противника
				enemy = 2;
			else
				enemy = 1;
			
			
			
			// Проверка на коня
			
				if (tX - 1 >= 0 && tY - 2 >= 0)			// Проверка выхода за поле
				{							// Проверка наличия фигуры
					if (14 < masFCH[tX - 1][tY - 2])
					{
						if ((("" + masFCH[tX - 1][tY - 2])[1] + ("" + masFCH[tX - 1][tY - 2])[2]) != figCol && ("" + masFCH[tX - 1][tY - 2])[3] == enemy && ("" + masFCH[tX - 1][tY - 2])[0] == 3)
						{
							return 1;
						}
					}
				}
				if (tX + 1 < tileX && tY - 2 >= 0)
				{
					if (14 < masFCH[tX + 1][tY - 2])
					{
						if ((("" + masFCH[tX + 1][tY - 2])[1] + ("" + masFCH[tX + 1][tY - 2])[2]) != figCol && ("" + masFCH[tX + 1][tY - 2])[3] == enemy && ("" + masFCH[tX + 1][tY - 2])[0] == 3)
						{
							return 1;
						}
					}
				}
				if (tX - 1 >= 0 && tY + 2 < tileY)
				{
					if (14 < masFCH[tX - 1][tY + 2])
					{
						if ((("" + masFCH[tX - 1][tY + 2])[1] + ("" + masFCH[tX - 1][tY + 2])[2]) != figCol && ("" + masFCH[tX - 1][tY + 2])[3] == enemy && ("" + masFCH[tX - 1][tY + 2])[0] == 3)
						{
							return 1;
						}
					}
				}
				if (tX + 1 < tileX && tY + 2 < tileY)
				{
					if (14 < masFCH[tX + 1][tY + 2])
					{
						if ((("" + masFCH[tX + 1][tY + 2])[1] + ("" + masFCH[tX + 1][tY + 2])[2]) != figCol && ("" + masFCH[tX + 1][tY + 2])[3] == enemy && ("" + masFCH[tX + 1][tY + 2])[0] == 3)
						{
							return 1;
						}
					}
				}
				if (tX + 2 < tileX && tY + 1 < tileY)
				{
					if (14 < masFCH[tX + 2][tY + 1])
					{
						if ((("" + masFCH[tX + 2][tY + 1])[1] + ("" + masFCH[tX + 2][tY + 1])[2]) != figCol && ("" + masFCH[tX + 2][tY + 1])[3] == enemy && ("" + masFCH[tX + 2][tY + 1])[0] == 3)
						{
							return 1;
						}
					}
				}
				if (tX + 2 < tileX && tY - 1 >= 0)
				{
					if (14 < masFCH[tX + 2][tY - 1])
					{
						if ((("" + masFCH[tX + 2][tY - 1])[1] + ("" + masFCH[tX + 2][tY - 1])[2]) != figCol && ("" + masFCH[tX + 2][tY - 1])[3] == enemy && ("" + masFCH[tX + 2][tY - 1])[0] == 3)
						{
							return 1;
						}
					}
				}
				if (tX - 2 >= 0 && tY + 1 < tileY)
				{
					if (14 < masFCH[tX - 2][tY + 1])
					{
						if ((("" + masFCH[tX - 2][tY + 1])[1] + ("" + masFCH[tX - 2][tY + 1])[2]) != figCol && ("" + masFCH[tX - 2][tY + 1])[3] == enemy && ("" + masFCH[tX - 2][tY + 1])[0] == 3)
						{
							return 1;
						}
					}
				}
				if (tX - 2 >= 0 && tY - 1 >= 0)
				{
					if (14 < masFCH[tX - 2][tY - 1])
					{
						if ((("" + masFCH[tX - 2][tY - 1])[1] + ("" + masFCH[tX - 2][tY - 1])[2]) != figCol && ("" + masFCH[tX - 2][tY - 1])[3] == enemy && ("" + masFCH[tX - 2][tY - 1])[0] == 3)
						{
							return 1;
						}
					}
				}
			
			// Проверка по диагоналям на слона и королеву
			
				for (var i = tX + 1, j = tY + 1; i < tileX && j < tileY && i < tX + 9 && j < tY + 9; i++, j++)
				{
					if (14 < masFCH[i][j])
					{
						if ((("" + masFCH[i][j])[1] + ("" + masFCH[i][j])[2]) != figCol && ("" + masFCH[i][j])[3] == enemy && (("" + masFCH[i][j])[0] == 4 || ("" + masFCH[i][j])[0] == 5))
						{
							return 1;
						}
						break;
					}
				}
				for (var i = tX - 1, j = tY - 1; i >= 0 && j >= 0 && i > tX - 9 && j > tY - 9; i--, j--)
				{
					if (14 < masFCH[i][j])
					{
						if ((("" + masFCH[i][j])[1] + ("" + masFCH[i][j])[2]) != figCol && ("" + masFCH[i][j])[3] == enemy && (("" + masFCH[i][j])[0] == 4 || ("" + masFCH[i][j])[0] == 5))
						{
							return 1;
						}
						break;
					}
				}
				for (var i = tX + 1, j = tY - 1; i < tileX && j >= 0 && i < tX + 9 && j > tY - 9; i++, j--)
				{
					if (14 < masFCH[i][j])
					{
						if ((("" + masFCH[i][j])[1] + ("" + masFCH[i][j])[2]) != figCol && ("" + masFCH[i][j])[3] == enemy && (("" + masFCH[i][j])[0] == 4 || ("" + masFCH[i][j])[0] == 5))
						{
							return 1;
						}
						break;
					}
				}
				for (var i = tX - 1, j = tY + 1; i >= 0 && j < tileY && i > tX - 9 && j < tY + 9; i--, j++)
				{
					if (14 < masFCH[i][j])
					{
						if ((("" + masFCH[i][j])[1] + ("" + masFCH[i][j])[2]) != figCol && ("" + masFCH[i][j])[3] == enemy && (("" + masFCH[i][j])[0] == 4 || ("" + masFCH[i][j])[0] == 5))
						{
							return 1;
						}
						break;
					}
				}
			
			// Проверка по вертикали и горизонтали на ладью и королеву
			
				for (var i = tX + 1; i < tX + 9 && i < tileX; i++)
				{
					if (14 < masFCH[i][tY])
					{
						if ((("" + masFCH[i][tY])[1] + ("" + masFCH[i][tY])[2]) != figCol && ("" + masFCH[i][tY])[3] == enemy && (("" + masFCH[i][tY])[0] == 2 || ("" + masFCH[i][tY])[0] == 5))
						{
							return 1;
						}
						break;
					}
				}
				for (var i = tX - 1; i > tX - 9 && i >= 0; i--)
				{
					if (14 < masFCH[i][tY])
					{
						if ((("" + masFCH[i][tY])[1] + ("" + masFCH[i][tY])[2]) != figCol && ("" + masFCH[i][tY])[3] == enemy && (("" + masFCH[i][tY])[0] == 2 || ("" + masFCH[i][tY])[0] == 5))
						{
							return 1;
						}
						break;
					}
				}
				for (var i = tY + 1; i < tY + 9 && i < tileY; i++)
				{
					if (14 < masFCH[tX][i])
					{
						if ((("" + masFCH[tX][i])[1] + ("" + masFCH[tX][i])[2]) != figCol && ("" + masFCH[tX][i])[3] == enemy && (("" + masFCH[tX][i])[0] == 2 || ("" + masFCH[tX][i])[0] == 5))
						{
							return 1;
						}
						break;
					}
				}
				for (var i = tY - 1; i > tY - 9 && i >= 0; i--)
				{
					if (14 < masFCH[tX][i])
					{
						if ((("" + masFCH[tX][i])[1] + ("" + masFCH[tX][i])[2]) != figCol && ("" + masFCH[tX][i])[3] == enemy && (("" + masFCH[tX][i])[0] == 2 || ("" + masFCH[tX][i])[0] == 5))
						{
							return 1;
						}
						break;
					}
				}
			
			// Проверка на короля					(пустая трата ресурсов)
			
				if (tX - 1 >= 0 && tY - 1 >= 0)
				{
					if (14 < masFCH[tX - 1][tY - 1])
					{
						if ((("" + masFCH[tX - 1][tY - 1])[1] + ("" + masFCH[tX - 1][tY - 1])[2]) != figCol && ("" + masFCH[tX - 1][tY - 1])[3] == enemy && ("" + masFCH[tX - 1][tY - 1])[0] == 6)
						{
							return 1;
						}
					}
				}
				if (tY - 1 >= 0)
				{
					if (14 < masFCH[tX][tY - 1])
					{
						if ((("" + masFCH[tX][tY - 1])[1] + ("" + masFCH[tX][tY - 1])[2]) != figCol && ("" + masFCH[tX][tY - 1])[3] == enemy && ("" + masFCH[tX][tY - 1])[0] == 6)
						{
							return 1;
						}
					}
				}
				if (tX + 1 < tileX && tY - 1 >= 0)
				{
					if (14 < masFCH[tX + 1][tY - 1])
					{
						if ((("" + masFCH[tX + 1][tY - 1])[1] + ("" + masFCH[tX + 1][tY - 1])[2]) != figCol && ("" + masFCH[tX + 1][tY - 1])[3] == enemy && ("" + masFCH[tX + 1][tY - 1])[0] == 6)
						{
							return 1;
						}
					}
				}
				if (tX + 1 < tileX)
				{
					if (14 < masFCH[tX + 1][tY])
					{
						if ((("" + masFCH[tX + 1][tY])[1] + ("" + masFCH[tX + 1][tY])[2]) != figCol && ("" + masFCH[tX + 1][tY])[3] == enemy && ("" + masFCH[tX + 1][tY])[0] == 6)
						{
							return 1;
						}
					}
				}
				if (tX + 1 < tileX && tY + 1 < tileY)
				{
					if (14 < masFCH[tX + 1][tY + 1])
					{
						if ((("" + masFCH[tX + 1][tY + 1])[1] + ("" + masFCH[tX + 1][tY + 1])[2]) != figCol && ("" + masFCH[tX + 1][tY + 1])[3] == enemy && ("" + masFCH[tX + 1][tY + 1])[0] == 6)
						{
							return 1;
						}
					}
				}
				if (tY + 1 < tileY)
				{
					if (14 < masFCH[tX][tY + 1])
					{
						if ((("" + masFCH[tX][tY + 1])[1] + ("" + masFCH[tX][tY + 1])[2]) != figCol && ("" + masFCH[tX][tY + 1])[3] == enemy && ("" + masFCH[tX][tY + 1])[0] == 6)
						{
							return 1;
						}
					}
				}
				if (tX - 1 >= 0 && tY + 1 < tileY)
				{
					if (14 < masFCH[tX - 1][tY + 1])
					{
						if ((("" + masFCH[tX - 1][tY + 1])[1] + ("" + masFCH[tX - 1][tY + 1])[2]) != figCol && ("" + masFCH[tX - 1][tY + 1])[3] == enemy && ("" + masFCH[tX - 1][tY + 1])[0] == 6)
						{
							return 1;
						}
					}
				}
				if (tX - 1 >= 0)
				{
					if (14 < masFCH[tX - 1][tY])
					{
						if ((("" + masFCH[tX - 1][tY])[1] + ("" + masFCH[tX - 1][tY])[2]) != figCol && ("" + masFCH[tX - 1][tY])[3] == enemy && ("" + masFCH[tX - 1][tY])[0] == 6)
						{
							return 1;
						}
					}
				}
			
			// Проверка на пешку					(уаааааааа)
			
				if (tX - 1 >= 0 && tY - 1 >= 0 && (tX < 8 || tY < 8))
				{
					if (14 < masFCH[tX - 1][tY - 1])
					{
						if ((("" + masFCH[tX - 1][tY - 1])[1] + ("" + masFCH[tX - 1][tY - 1])[2]) != figCol && ("" + masFCH[tX - 1][tY - 1])[3] == enemy && ("" + masFCH[tX - 1][tY - 1])[0] == 1)
						{
							return 1;
						}
					}
				}
				if (tX + 1 < tileX && tY - 1 >= 0 && (tX > 7 || tY < 8))
				{
					if (14 < masFCH[tX + 1][tY - 1])
					{
						if ((("" + masFCH[tX + 1][tY - 1])[1] + ("" + masFCH[tX + 1][tY - 1])[2]) != figCol && ("" + masFCH[tX + 1][tY - 1])[3] == enemy && ("" + masFCH[tX + 1][tY - 1])[0] == 1)
						{
							return 1;
						}
					}
				}
				if (tX + 1 < tileX && tY + 1 < tileY && (tX > 7 || tY > 7))
				{
					if (14 < masFCH[tX + 1][tY + 1])
					{
						if ((("" + masFCH[tX + 1][tY + 1])[1] + ("" + masFCH[tX + 1][tY + 1])[2]) != figCol && ("" + masFCH[tX + 1][tY + 1])[3] == enemy && ("" + masFCH[tX + 1][tY + 1])[0] == 1)
						{
							return 1;
						}
					}
				}
				if (tX - 1 >= 0 && tY + 1 < tileY && (tX < 8 || tY > 7))
				{
					if (14 < masFCH[tX - 1][tY + 1])
					{
						if ((("" + masFCH[tX - 1][tY + 1])[1] + ("" + masFCH[tX - 1][tY + 1])[2]) != figCol && ("" + masFCH[tX - 1][tY + 1])[3] == enemy && ("" + masFCH[tX - 1][tY + 1])[0] == 1)
						{
							return 1;
						}
					}
				}
		}
		
		
		




