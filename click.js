




		var up = 0;
		
		function upgrade()		// Функция отображающая фигуры для повышения пешки
		{
			var col = 0;
			
			if (("" + figUP.children[1].index)[1] == 0)						// Правильно определяем цвет
				col = ("" + figUP.children[1].index)[2];
			else
				col = ("" + figUP.children[1].index)[1] + ("" + figUP.children[1].index)[2];
			
			div2TFUP.style.background = "no-repeat url(images/f2-" + col + ".png)";
			div3TFUP.style.background = "no-repeat url(images/f3-" + col + ".png)";
			div4TFUP.style.background = "no-repeat url(images/f4-" + col + ".png)";
			div5TFUP.style.background = "no-repeat url(images/f5-" + col + ".png)";
			div6TFUP.style.background = "no-repeat url(images/f6-" + col + ".png)";
			
			divTileBoxUP.style.visibility = "visible";		// Отображаем блок с кнопками
		}
		
		
		
		var kingRock1 = 1;		// Переменные для осуществления рокировки
		var kingRock2 = 1;
		
		var lkx = 0;			// Переменные для запоминания координаты X ладьи для рокировки
		var rkx = 0;
		
		var lad11 = 0;			// Переменные для отслеживания ходов ладей
		var lad21 = 0;
		var lad31 = 0;
		var lad41 = 0;
		var lad12 = 0;
		var lad22 = 0;
		var lad32 = 0;
		var lad42 = 0;
		
		var elem;
		var lastCol = 0;		// Запоминает цвет прошлого нажатого тайла
		var lastColP = 0;		// Запоминает цвет в буфер после наведения
		var selectFig = 0;
		var lastElem;
		
		var tmpBack;
		var tmpInd;
		
		var colHod = "#007755";		// Цвет выделения возможного хода
		var colKill = "#FF7777";	// Цвет выделения возможного взятия фигуры
		var colRock = "#5CF7F5";	// Цвет выделения возможной рокировки
		
		
		
		var colP1 = 0;			// Переменные отвечающие за основной цвет фигур игрока
		var colP2 = 1;
		
		var masCon = new Array(14);	// Массив для организации контроля цветных полей
		
		for (var i = 0; i < 14; i++)
		{
			masCon[i] = 0;
		}
		
		function newCon(el, k)				// Функция реализующая изменения после перемещения фигуры на цветное поле
		{
			masCon[el.index] = k;
			
			if (el.index == colP1 || el.index == colP2)	// Если клетка цвета фигур одного из королей игрока, не передаем контроль
				return;
			
			for (var i = 0; i < tileX; i++)
			{
				for (var j = 0; j < tileY; j++)
				{
					if (("" + masF[j][i].index)[1] + ("" + masF[j][i].index)[2] == el.index)
					{
						masF[j][i].index = ("" + masF[j][i].index)[0] + ("" + masF[j][i].index)[1] + ("" + masF[j][i].index)[2] + k;
						
						if (mas[j][i].index < 12 && mas[j][i].index != colP1 && mas[j][i].index != colP2)
						{
							newCon(mas[j][i], nowH);
						}
					}
				}
			}
		}
		
		function lostCon(el, k)				// Функция реализующая изменения после ухода фигуры с цветного поля
		{
			if (k == 0)
				masCon[el.index] = 0;
			
			if (el.index == colP1 || el.index == colP2)	// Если клетка цвета фигур одного из королей игрока, не теряем контроль
				return;
			
			for (var i = 0; i < tileX; i++)
			{
				for (var j = 0; j < tileY; j++)
				{
					if (("" + masF[j][i].index)[1] + ("" + masF[j][i].index)[2] == el.index)
					{
						masF[j][i].index = ("" + masF[j][i].index)[0] + ("" + masF[j][i].index)[1] + ("" + masF[j][i].index)[2] + 0;
						
						if (mas[j][i].index < 12 && mas[j][i].index != colP1 && mas[j][i].index != colP2)
						{
							lostCon(mas[j][i], 1);
						}
					}
				}
			}
		}
		
		function clickT(idT)			// Функция отвечающая за перемещение фигур (ход игрока и ИИ)
		{
			if (up == 1)
				return;
			
			lastElem = elem;
			
			elem = document.getElementById(idT);
			
			var tile = elem.children[1].index;
			var strD = "" + tile;
			
			db3.innerText = "tile: " + tile;		// !!! DEBUG !!!
			db4.innerText = "idT: " + idT;			// !!! DEBUG !!!
			db5.innerText = "nowH: " + nowH;		// !!! DEBUG !!!
			db6.innerText = "elem: " + elem.index;		// !!! DEBUG !!!
			
			if (selectFig == 1 && strD[3] != nowH)		// Если была выбрана фигура, осуществить движение
			{
				selectFig = 0;
				
				lastElem.name = 0; 			// Сброс еффекта нажатия
				lastElem.style.background = lastCol;
				lastCol = lastColP;
				
				if (elem.name == 2 || elem.name == 3)			// Переход на пустой тайл, ну, либо занятый... а также рокировка
				{
					lastElem.children[1].style.background = lastElem.style.background;
					lastElem.children[1].index = lastElem.index;
					
					elem.children[1].style.background = tmpBack;
					elem.children[1].index = tmpInd;
					
					if (elem.index < 12)		// Встаем на цветное поле
					{
						newCon(elem, nowH);
					}
					
					if (lastElem.index < 12 && elem.index != lastElem.index)	// Уходим с цветного поля
					{
						lostCon(lastElem, 0);
					}
					
					if (("" + elem.children[1].index)[0] == 6)		// Отключение возможности рокировки если король ходил
					{
						if (nowH == 1)
							kingRock1 = 0;
						else
							kingRock2 = 0;
					}
					
					if (("" + elem.children[1].index)[0] == 1)		// Реализация повышения пешки
					{
						var tX = 0;
						var tY = 0;
						
						for (var i = 0; i < tileY; i++)			// Определяем координаты
						{
							for (var j = 0; j < tileX; j++)
							{
								if (mas[j][i] == elem)
								{
									tX = j;
									tY = i;
								}
							}
						}
						
						if (tX > 5 && tX < 10 & tY > 5 && tY < 10)		// Если пешка зашла в квадрат по центру
						{
							figUP = elem;			// Запоминаем фигуру и ее координаты
							figUPX = tX;
							figUPY = tY;
							
							up = 1;
							
							upgrade();			// Отображаем фигуры для выбора
							
							deskColor(0);
							return;
						}
					}
					
					if (elem.name == 3)			// Осуществление рокировки
					{
						var tX = 0;
						var tY = 0;
						
						if (nowH == 1)
							tY = 15;
							
						for (var i = 0; i < tileX; i++)				// Определяем короля и его координату X
							if(("" + masF[i][tY].index)[0] == 6 && ("" + masF[i][tY].index)[3] == nowH)
								tX = i;
						
						if (tX < 8)		// Передвигаем ладью за короля
						{
							masF[tX + 1][tY].style.background = masF[lkx][tY].style.background;
							masF[tX + 1][tY].index = masF[lkx][tY].index;
							masF[lkx][tY].style.background = mas[lkx][tY].style.background;
							masF[lkx][tY].index = mas[lkx][tY].index;
						}
						else
						{
							masF[tX - 1][tY].style.background = masF[rkx][tY].style.background;
							masF[tX - 1][tY].index = masF[rkx][tY].index;
							masF[rkx][tY].style.background = mas[rkx][tY].style.background;
							masF[rkx][tY].index = mas[rkx][tY].index;
						}
					}
					
					if (("" + elem.children[1].index)[0] == 2 && (kingRock1 == 1 || kingRock2 == 1))	// Отслеживание хода ладьи для рокировки
					{
						if (masF[2][0] == elem.children[1])		lad12 = 1;
						else if (masF[4][0] == elem.children[1])	lad22 = 1;
						else if (masF[11][0] == elem.children[1])	lad32 = 1;
						else if (masF[13][0] == elem.children[1])	lad42 = 1;
						else if (masF[2][15] == elem.children[1])	lad11 = 1;
						else if (masF[4][15] == elem.children[1])	lad21 = 1;
						else if (masF[11][15] == elem.children[1])	lad31 = 1;
						else if (masF[13][15] == elem.children[1])	lad41 = 1;
					}
					
					if (nowH == 1)					// Передаем ход другому игроку
					{
						nowH = 2;
						masFRE[0].style.background = "no-repeat url(images/f6-" + colP2 + ".png)";
					}
					else
					{
						nowH = 1;
						masFRE[0].style.background = "no-repeat url(images/f6-" + colP1 + ".png)";
					}
					
					for (var i = 1; i < 16; i++)
						masRE[i].style.visibility = "hidden";
					
					clickRE();
					onKing = 0;
				}
				
				deskColor(0);
				return;
			}
			
			deskColor(0);
			
			if (elem.name == 1) 				// Отмена если нажат выделенный тайл
			{
				return;
			}
			if (tile < 14) 					// Отмена если нажат тайл без фигуры
			{
				lastElem.name = 0; 			// Сброс еффекта нажатия
				lastElem.style.background = lastCol;
				lastCol = lastColP;
				return;
			}
			
			lastElem.name = 0; 				// Сброс еффекта нажатия с предыдущего тайла
			lastElem.style.background = lastCol;
			
			lastCol = lastColP; 				// Запоминаем цвет тайла
			
			elem.name = 1; 					// Отмечаем факт нажатия на тайл
			elem.style.background = "#007755";
			
									// Далее идет анализ нажатой фигуры и действия в соответсвии с этим
			var str = "" + tile;
			var figNum = str[0];
			var figCol = str[1] + str[2];
			var figCtr = str[3];
			
		//	db2.innerText = figNum + " : " + figCol;	// !!! DEBUG !!!
			
			var tX = 0;
			var tY = 0;
			
			for (var i = 0; i < tileY; i++)
			{
				for (var j = 0; j < tileX; j++)
				{
					if (mas[j][i] == elem)
					{
						tX = j;
						tY = i;
					}
				}
			}
			
			db2.innerText = tX + "/" + tY;					// !!! DEBUG !!!
			
			if (figCtr != nowH)	// Отмена, если фигура не принадлежит текущему игроку
				return;
			
			selectFig = 1;		// Запоминаем, что выбрана фигура
			
			tmpBack = elem.children[1].style.background;	// Запоминаем, фигуру и ее индекс
			tmpInd = tile;
			
			if (figNum === "1" && onKing === 0)		// Пешка
			{
				if (tY > 8)
				{
					if (tY - 1 >= 0)
					{
						if (masF[tX][tY - 1].index < 14)
						{
							if (figCol != mas[tX][tY - 1].index && masCon[mas[tX][tY - 1].index] == 0)
							{
								if (checker(tX, tY, tX, tY - 1) != 1)
								{
									mas[tX][tY - 1].style.background = colHod;
									mas[tX][tY - 1].name = 2;
								}
							}
						}
					}
					if (tY - 2 >= 0)
					{
						if (masF[tX][tY - 1].index < 14 && masF[tX][tY - 2].index < 14 && tY == 14)
						{
							if (checker(tX, tY, tX, tY - 2) != 1)
							{
								mas[tX][tY - 2].style.background = colHod;
								mas[tX][tY - 2].name = 2;
							}
						}
					}
					if (tX - 1 >= 0 && tY - 1 >= 0)
					{
						if (masF[tX - 1][tY - 1].index > 14)
						{
							if (figCol != mas[tX - 1][tY - 1].index && ("" + masF[tX - 1][tY - 1].index)[3] != nowH && ("" + masF[tX - 1][tY - 1].index)[3] != 0)
							{
								if (checker(tX, tY, tX - 1, tY - 1) != 1)
								{
									mas[tX - 1][tY - 1].style.background = colKill;
									mas[tX - 1][tY - 1].name = 2;
								}
							}
						}
					}
					if (tX + 1 < tileX && tY - 1 >= 0)
					{
						if (masF[tX + 1][tY - 1].index > 14)
						{
							if (figCol != mas[tX + 1][tY - 1].index && ("" + masF[tX + 1][tY - 1].index)[3] != nowH && ("" + masF[tX + 1][tY - 1].index)[3] != 0)
							{
								if (checker(tX, tY, tX + 1, tY - 1) != 1)
								{
									mas[tX + 1][tY - 1].style.background = colKill;
									mas[tX + 1][tY - 1].name = 2;
								}
							}
						}
					}
				}
				if (tY < 7)
				{
					if (tY + 1 < tileY)
					{
						if (masF[tX][tY + 1].index < 14)
						{
							if (figCol != mas[tX][tY + 1].index && masCon[mas[tX][tY + 1].index] == 0)
							{
								if (checker(tX, tY, tX, tY + 1) != 1)
								{
									mas[tX][tY + 1].style.background = colHod;
									mas[tX][tY + 1].name = 2;
								}
							}
						}
					}
					if (tY + 2 < tileY)
					{
						if (masF[tX][tY + 1].index < 14 && masF[tX][tY + 2].index < 14 && tY == 1)
						{
							if (checker(tX, tY, tX, tY + 2) != 1)
							{
								mas[tX][tY + 2].style.background = colHod;
								mas[tX][tY + 2].name = 2;
							}
						}
					}
					if (tX - 1 >= 0 && tY + 1 < tileY)
					{
						if (masF[tX - 1][tY + 1].index > 14)
						{
							if (figCol != mas[tX - 1][tY + 1].index && ("" + masF[tX - 1][tY + 1].index)[3] != nowH && ("" + masF[tX - 1][tY + 1].index)[3] != 0)
							{
								if (checker(tX, tY, tX - 1, tY + 1) != 1)
								{
									mas[tX - 1][tY + 1].style.background = colKill;
									mas[tX - 1][tY + 1].name = 2;
								}
							}
						}
					}
					if (tX + 1 < tileX && tY + 1 < tileY)
					{
						if (masF[tX + 1][tY + 1].index > 14)
						{
							if (figCol != mas[tX + 1][tY + 1].index && ("" + masF[tX + 1][tY + 1].index)[3] != nowH && ("" + masF[tX + 1][tY + 1].index)[3] != 0)
							{
								if (checker(tX, tY, tX + 1, tY + 1) != 1)
								{
									mas[tX + 1][tY + 1].style.background = colKill;
									mas[tX + 1][tY + 1].name = 2;
								}
							}
						}
					}
				}
				if (tX > 8)
				{
					if (tX - 1 >= 0)
					{
						if (masF[tX - 1][tY].index < 14)
						{
							if (figCol != mas[tX - 1][tY].index && masCon[mas[tX - 1][tY].index] == 0)
							{
								if (checker(tX, tY, tX - 1, tY) != 1)
								{
									mas[tX - 1][tY].style.background = colHod;
									mas[tX - 1][tY].name = 2;
								}
							}
						}
					}
					if (tX - 1 >= 0)
					{
						if (masF[tX - 1][tY].index < 14 && masF[tX - 2][tY].index < 14 && tX == 14)
						{
							if (checker(tX, tY, tX - 2, tY) != 1)
							{
								mas[tX - 2][tY].style.background = colHod;
								mas[tX - 2][tY].name = 2;
							}
						}
					}
					if (tX - 1 >= 0 && tY - 1 >= 0)
					{
						if (masF[tX - 1][tY - 1].index > 14)
						{
							if (figCol != mas[tX - 1][tY - 1].index && ("" + masF[tX - 1][tY - 1].index)[3] != nowH && ("" + masF[tX - 1][tY - 1].index)[3] != 0)
							{
								if (checker(tX, tY, tX - 1, tY - 1) != 1)
								{
									mas[tX - 1][tY - 1].style.background = colKill;
									mas[tX - 1][tY - 1].name = 2;
								}
							}
						}
					}
					if (tX - 1 >= 0 && tY + 1 < tileY)
					{
						if (masF[tX - 1][tY + 1].index > 14)
						{
							if (figCol != mas[tX - 1][tY + 1].index && ("" + masF[tX - 1][tY + 1].index)[3] != nowH && ("" + masF[tX - 1][tY + 1].index)[3] != 0)
							{
								if (checker(tX, tY, tX - 1, tY + 1) != 1)
								{
									mas[tX - 1][tY + 1].style.background = colKill;
									mas[tX - 1][tY + 1].name = 2;
								}
							}
						}
					}
				}
				if (tX < 7)
				{
					if (tX + 1 < tileX)
					{
						if (masF[tX + 1][tY].index < 14)
						{
							if (figCol != mas[tX + 1][tY].index && masCon[mas[tX + 1][tY].index] == 0)
							{
								if (checker(tX, tY, tX + 1, tY) != 1)
								{
									mas[tX + 1][tY].style.background = colHod;
									mas[tX + 1][tY].name = 2;
								}
							}
						}
					}
					if (tX + 1 < tileX)
					{
						if (masF[tX + 1][tY].index < 14 && masF[tX + 2][tY].index < 14 && tX == 1)
						{
							if (checker(tX, tY, tX + 2, tY) != 1)
							{
								mas[tX + 2][tY].style.background = colHod;
								mas[tX + 2][tY].name = 2;
							}
						}
					}
					if (tX + 1 < tileX && tY - 1 >= 0)
					{
						if (masF[tX + 1][tY - 1].index > 14)
						{
							if (figCol != mas[tX + 1][tY - 1].index && ("" + masF[tX + 1][tY - 1].index)[3] != nowH && ("" + masF[tX + 1][tY - 1].index)[3] != 0)
							{
								if (checker(tX, tY, tX + 1, tY - 1) != 1)
								{
									mas[tX + 1][tY - 1].style.background = colKill;
									mas[tX + 1][tY - 1].name = 2;
								}
							}
						}
					}
					if (tX + 1 < tileX && tY + 1 < tileY)
					{
						if (masF[tX + 1][tY + 1].index > 14)
						{
							if (figCol != mas[tX + 1][tY + 1].index && ("" + masF[tX + 1][tY + 1].index)[3] != nowH && ("" + masF[tX + 1][tY + 1].index)[3] != 0)
							{
								if (checker(tX, tY, tX + 1, tY + 1) != 1)
								{
									mas[tX + 1][tY + 1].style.background = colKill;
									mas[tX + 1][tY + 1].name = 2;
								}
							}
						}
					}
				}
			}
			else if (figNum === "2" && onKing == 0)	// Ладья
			{
				for (var i = tX + 1; i < tX + 9 && i < tileX; i++)
				{
					if (masF[i][tY].index < 14)
					{
						if (figCol != mas[i][tY].index && masCon[mas[i][tY].index] == 0)
						{
							if (checker(tX, tY, i, tY) != 1)
							{
								mas[i][tY].style.background = colHod;
								mas[i][tY].name = 2;
							}
						}
					}
					else
					{
						if (figCol != mas[i][tY].index && ("" + masF[i][tY].index)[3] != nowH && ("" + masF[i][tY].index)[3] != 0)
						{
							if (checker(tX, tY, i, tY) != 1)
							{
								mas[i][tY].style.background = colKill;
								mas[i][tY].name = 2;
							}
						}
						break;
					}
				}
				for (var i = tX - 1; i > tX - 9 && i >= 0; i--)
				{
					if (masF[i][tY].index < 14)
					{
						if (figCol != mas[i][tY].index && masCon[mas[i][tY].index] == 0)
						{
							if (checker(tX, tY, i, tY) != 1)
							{
								mas[i][tY].style.background = colHod;
								mas[i][tY].name = 2;
							}
						}
					}
					else
					{
						if (figCol != mas[i][tY].index && ("" + masF[i][tY].index)[3] != nowH && ("" + masF[i][tY].index)[3] != 0)
						{
							if (checker(tX, tY, i, tY) != 1)
							{
								mas[i][tY].style.background = colKill;
								mas[i][tY].name = 2;
							}
						}
						break;
					}
				}
				for (var i = tY + 1; i < tY + 9 && i < tileY; i++)
				{
					if (masF[tX][i].index < 14)
					{
						if (figCol != mas[tX][i].index && masCon[mas[tX][i].index] == 0)
						{
							if (checker(tX, tY, tX, i) != 1)
							{
								mas[tX][i].style.background = colHod;
								mas[tX][i].name = 2;
							}
						}
					}
					else
					{
						if (figCol != mas[tX][i].index && ("" + masF[tX][i].index)[3] != nowH && ("" + masF[tX][i].index)[3] != 0)
						{
							if (checker(tX, tY, tX, i) != 1)
							{
								mas[tX][i].style.background = colKill;
								mas[tX][i].name = 2;
							}
						}
						break;
					}
				}
				for (var i = tY - 1; i > tY - 9 && i >= 0; i--)
				{
					if (masF[tX][i].index < 14)
					{
						if (figCol != mas[tX][i].index && masCon[mas[tX][i].index] == 0)
						{
							if (checker(tX, tY, tX, i) != 1)
							{
								mas[tX][i].style.background = colHod;
								mas[tX][i].name = 2;
							}
						}
					}
					else
					{
						if (figCol != mas[tX][i].index && ("" + masF[tX][i].index)[3] != nowH && ("" + masF[tX][i].index)[3] != 0)
						{
							if (checker(tX, tY, tX, i) != 1)
							{
								mas[tX][i].style.background = colKill;
								mas[tX][i].name = 2;
							}
						}
						break;
					}
				}
			}
			else if (figNum === "3")	// Конь
			{
				if (tX - 1 >= 0 && tY - 2 >= 0)
				{
					if (masF[tX - 1][tY - 2].index < 14)
					{
						if (figCol != mas[tX - 1][tY - 2].index && masCon[mas[tX - 1][tY - 2].index] == 0)
						{
							if (checker(tX, tY, tX - 1, tY - 2) != 1)
							{
								mas[tX - 1][tY - 2].style.background = colHod;
								mas[tX - 1][tY - 2].name = 2;
							}
						}
					}
					else
					{
						if (figCol != mas[tX - 1][tY - 2].index && ("" + masF[tX - 1][tY - 2].index)[3] != nowH && ("" + masF[tX - 1][tY - 2].index)[3] != 0)
						{
							if (checker(tX, tY, tX - 1, tY - 2) != 1)
							{
								mas[tX - 1][tY - 2].style.background = colKill;
								mas[tX - 1][tY - 2].name = 2;
							}
						}
					}
				}
				if (tX + 1 < tileX && tY - 2 >= 0)
				{
					if (masF[tX + 1][tY - 2].index < 14)
					{
						if (figCol != mas[tX + 1][tY - 2].index && masCon[mas[tX + 1][tY - 2].index] == 0)
						{
							if (checker(tX, tY, tX + 1, tY - 2) != 1)
							{
								mas[tX + 1][tY - 2].style.background = colHod;
								mas[tX + 1][tY - 2].name = 2;
							}
						}
					}
					else
					{
						if (figCol != mas[tX + 1][tY - 2].index && ("" + masF[tX + 1][tY - 2].index)[3] != nowH && ("" + masF[tX + 1][tY - 2].index)[3] != 0)
						{
							if (checker(tX, tY, tX + 1, tY - 2) != 1)
							{
								mas[tX + 1][tY - 2].style.background = colKill;
								mas[tX + 1][tY - 2].name = 2;
							}
						}
					}
				}
				if (tX - 1 >= 0 && tY + 2 < tileY)
				{
					if (masF[tX - 1][tY + 2].index < 14)
					{
						if (figCol != mas[tX - 1][tY + 2].index && masCon[mas[tX - 1][tY + 2].index] == 0)
						{
							if (checker(tX, tY, tX - 1, tY + 2) != 1)
							{
								mas[tX - 1][tY + 2].style.background = colHod;
								mas[tX - 1][tY + 2].name = 2;
							}
						}
					}
					else
					{
						if (figCol != mas[tX - 1][tY + 2].index && ("" + masF[tX - 1][tY + 2].index)[3] != nowH && ("" + masF[tX - 1][tY + 2].index)[3] != 0)
						{
							if (checker(tX, tY, tX - 1, tY + 2) != 1)
							{
								mas[tX - 1][tY + 2].style.background = colKill;
								mas[tX - 1][tY + 2].name = 2;
							}
						}
					}
				}
				if (tX + 1 < tileX && tY + 2 < tileY)
				{
					if (masF[tX + 1][tY + 2].index < 14)
					{
						if (figCol != mas[tX + 1][tY + 2].index && masCon[mas[tX + 1][tY + 2].index] == 0)
						{
							if (checker(tX, tY, tX + 1, tY + 2) != 1)
							{
								mas[tX + 1][tY + 2].style.background = colHod;
								mas[tX + 1][tY + 2].name = 2;
							}
						}
					}
					else
					{
						if (figCol != mas[tX + 1][tY + 2].index && ("" + masF[tX + 1][tY + 2].index)[3] != nowH && ("" + masF[tX + 1][tY + 2].index)[3] != 0)
						{
							if (checker(tX, tY, tX + 1, tY + 2) != 1)
							{
								mas[tX + 1][tY + 2].style.background = colKill;
								mas[tX + 1][tY + 2].name = 2;
							}
						}
					}
				}
				if (tX + 2 < tileX && tY + 1 < tileY)
				{
					if (masF[tX + 2][tY + 1].index < 14)
					{
						if (figCol != mas[tX + 2][tY + 1].index && masCon[mas[tX + 2][tY + 1].index] == 0)
						{
							if (checker(tX, tY, tX + 2, tY + 1) != 1)
							{
								mas[tX + 2][tY + 1].style.background = colHod;
								mas[tX + 2][tY + 1].name = 2;
							}
						}
					}
					else
					{
						if (figCol != mas[tX + 2][tY + 1].index && ("" + masF[tX + 2][tY + 1].index)[3] != nowH && ("" + masF[tX + 2][tY + 1].index)[3] != 0)
						{
							if (checker(tX, tY, tX + 2, tY + 1) != 1)
							{
								mas[tX + 2][tY + 1].style.background = colKill;
								mas[tX + 2][tY + 1].name = 2;
							}
						}
					}
				}
				if (tX + 2 < tileX && tY - 1 >= 0)
				{
					if (masF[tX + 2][tY - 1].index < 14)
					{
						if (figCol != mas[tX + 2][tY - 1].index && masCon[mas[tX + 2][tY - 1].index] == 0)
						{
							if (checker(tX, tY, tX + 2, tY - 1) != 1)
							{
								mas[tX + 2][tY - 1].style.background = colHod;
								mas[tX + 2][tY - 1].name = 2;
							}
						}
					}
					else
					{
						if (figCol != mas[tX + 2][tY - 1].index && ("" + masF[tX + 2][tY - 1].index)[3] != nowH && ("" + masF[tX + 2][tY - 1].index)[3] != 0)
						{
							if (checker(tX, tY, tX + 2, tY - 1) != 1)
							{
								mas[tX + 2][tY - 1].style.background = colKill;
								mas[tX + 2][tY - 1].name = 2;
							}
						}
					}
				}
				if (tX - 2 >= 0 && tY + 1 < tileY)
				{
					if (masF[tX - 2][tY + 1].index < 14)
					{
						if (figCol != mas[tX - 2][tY + 1].index && masCon[mas[tX - 2][tY + 1].index] == 0)
						{
							if (checker(tX, tY, tX - 2, tY + 1) != 1)
							{
								mas[tX - 2][tY + 1].style.background = colHod;
								mas[tX - 2][tY + 1].name = 2;
							}
						}
					}
					else
					{
						if (figCol != mas[tX - 2][tY + 1].index && ("" + masF[tX - 2][tY + 1].index)[3] != nowH && ("" + masF[tX - 2][tY + 1].index)[3] != 0)
						{
							if (checker(tX, tY, tX - 2, tY + 1) != 1)
							{
								mas[tX - 2][tY + 1].style.background = colKill;
								mas[tX - 2][tY + 1].name = 2;
							}
						}
					}
				}
				if (tX - 2 >= 0 && tY - 1 >= 0)
				{
					if (masF[tX - 2][tY - 1].index < 14)
					{
						if (figCol != mas[tX - 2][tY - 1].index && masCon[mas[tX - 2][tY - 1].index] == 0)
						{
							if (checker(tX, tY, tX - 2, tY - 1) != 1)
							{
								mas[tX - 2][tY - 1].style.background = colHod;
								mas[tX - 2][tY - 1].name = 2;
							}
						}
					}
					else
					{
						if (figCol != mas[tX - 2][tY - 1].index && ("" + masF[tX - 2][tY - 1].index)[3] != nowH && ("" + masF[tX - 2][tY - 1].index)[3] != 0)
						{
							if (checker(tX, tY, tX - 2, tY - 1) != 1)
							{
								mas[tX - 2][tY - 1].style.background = colKill;
								mas[tX - 2][tY - 1].name = 2;
							}
						}
					}
				}
			}
			else if (figNum === "4" && onKing == 0)	// Слон
			{
				for (var i = tX + 1, j = tY + 1; i < tileX && j < tileY && i < tX + 9 && j < tY + 9; i++, j++)
				{
					if (masF[i][j].index < 14)
					{
						if (figCol != mas[i][j].index && (masCon[mas[i][j].index] == 0 || mas[i][j].index == mas[tX][tY].index))
						{
							if (checker(tX, tY, i, j) != 1)
							{
								mas[i][j].style.background = colHod;
								mas[i][j].name = 2;
							}
						}
					}
					else
					{
						if (figCol != mas[i][j].index && ("" + masF[i][j].index)[3] != nowH && ("" + masF[i][j].index)[3] != 0)
						{
							if (checker(tX, tY, i, j) != 1)
							{
								mas[i][j].style.background = colKill;
								mas[i][j].name = 2;
							}
						}
						break;
					}
				}
				for (var i = tX - 1, j = tY - 1; i >= 0 && j >= 0 && i > tX - 9 && j > tY - 9; i--, j--)
				{
					if (masF[i][j].index < 14)
					{
						if (figCol != mas[i][j].index && (masCon[mas[i][j].index] == 0 || mas[i][j].index == mas[tX][tY].index))
						{
							if (checker(tX, tY, i, j) != 1)
							{
								mas[i][j].style.background = colHod;
								mas[i][j].name = 2;
							}
						}
					}
					else
					{
						if (figCol != mas[i][j].index && ("" + masF[i][j].index)[3] != nowH && ("" + masF[i][j].index)[3] != 0)
						{
							if (checker(tX, tY, i, j) != 1)
							{
								mas[i][j].style.background = colKill;
								mas[i][j].name = 2;
							}
						}
						break;
					}
				}
				for (var i = tX + 1, j = tY - 1; i < tileX && j >= 0 && i < tX + 9 && j > tY - 9; i++, j--)
				{
					if (masF[i][j].index < 14)
					{
						if (figCol != mas[i][j].index && (masCon[mas[i][j].index] == 0 || mas[i][j].index == mas[tX][tY].index))
						{
							if (checker(tX, tY, i, j) != 1)
							{
								mas[i][j].style.background = colHod;
								mas[i][j].name = 2;
							}
						}
					}
					else
					{
						if (figCol != mas[i][j].index && ("" + masF[i][j].index)[3] != nowH && ("" + masF[i][j].index)[3] != 0)
						{
							if (checker(tX, tY, i, j) != 1)
							{
								mas[i][j].style.background = colKill;
								mas[i][j].name = 2;
							}
						}
						break;
					}
				}
				for (var i = tX - 1, j = tY + 1; i >= 0 && j < tileY && i > tX - 9 && j < tY + 9; i--, j++)
				{
					if (masF[i][j].index < 14)
					{
						if (figCol != mas[i][j].index && (masCon[mas[i][j].index] == 0 || mas[i][j].index == mas[tX][tY].index))
						{
							if (checker(tX, tY, i, j) != 1)
							{
								mas[i][j].style.background = colHod;
								mas[i][j].name = 2;
							}
						}
					}
					else
					{
						if (figCol != mas[i][j].index && ("" + masF[i][j].index)[3] != nowH && ("" + masF[i][j].index)[3] != 0)
						{
							if (checker(tX, tY, i, j) != 1)
							{
								mas[i][j].style.background = colKill;
								mas[i][j].name = 2;
							}
						}
						break;
					}
				}
			}
			else if (figNum === "5" && onKing == 0)	// Королева							//***************************************************!!!!!!!!!!!!!
			{
				for (var i = tX + 1; i < tX + 9 && i < tileX; i++)
				{
					if (masF[i][tY].index < 14)
					{
						if (figCol != mas[i][tY].index && (masCon[mas[i][tY].index] == 0 ||
							mas[i][tY].index == colP1 || mas[i][tY].index == colP2))
						{
							if (checker(tX, tY, i, tY) != 1)
							{
								mas[i][tY].style.background = colHod;
								mas[i][tY].name = 2;
							}
						}
					}
					else
					{
						if (figCol != mas[i][tY].index && ("" + masF[i][tY].index)[3] != nowH && ("" + masF[i][tY].index)[3] != 0)
						{
							if (checker(tX, tY, i, tY) != 1)
							{
								mas[i][tY].style.background = colKill;
								mas[i][tY].name = 2;
							}
						}
						break;
					}
				}
				for (var i = tX - 1; i > tX - 9 && i >= 0; i--)
				{
					if (masF[i][tY].index < 14)
					{
						if (figCol != mas[i][tY].index && (masCon[mas[i][tY].index] == 0 ||
							mas[i][tY].index == colP1 || mas[i][tY].index == colP2))
						{
							if (checker(tX, tY, i, tY) != 1)
							{
								mas[i][tY].style.background = colHod;
								mas[i][tY].name = 2;
							}
						}
					}
					else
					{
						if (figCol != mas[i][tY].index && ("" + masF[i][tY].index)[3] != nowH && ("" + masF[i][tY].index)[3] != 0)
						{
							if (checker(tX, tY, i, tY) != 1)
							{
								mas[i][tY].style.background = colKill;
								mas[i][tY].name = 2;
							}
						}
						break;
					}
				}
				for (var i = tY + 1; i < tY + 9 && i < tileY; i++)
				{
					if (masF[tX][i].index < 14)
					{
						if (figCol != mas[tX][i].index && (masCon[mas[tX][i].index] == 0 ||
							mas[tX][i].index == colP1 || mas[tX][i].index == colP2))
						{
							if (checker(tX, tY, tX, i) != 1)
							{
								mas[tX][i].style.background = colHod;
								mas[tX][i].name = 2;
							}
						}
					}
					else
					{
						if (figCol != mas[tX][i].index && ("" + masF[tX][i].index)[3] != nowH && ("" + masF[tX][i].index)[3] != 0)
						{
							if (checker(tX, tY, tX, i) != 1)
							{
								mas[tX][i].style.background = colKill;
								mas[tX][i].name = 2;
							}
						}
						break;
					}
				}
				for (var i = tY - 1; i > tY - 9 && i >= 0; i--)
				{
					if (masF[tX][i].index < 14)
					{
						if (figCol != mas[tX][i].index && (masCon[mas[tX][i].index] == 0 ||
							mas[tX][i].index == colP1 || mas[tX][i].index == colP2))
						{
							if (checker(tX, tY, tX, i) != 1)
							{
								mas[tX][i].style.background = colHod;
								mas[tX][i].name = 2;
							}
						}
					}
					else
					{
						if (figCol != mas[tX][i].index && ("" + masF[tX][i].index)[3] != nowH && ("" + masF[tX][i].index)[3] != 0)
						{
							if (checker(tX, tY, tX, i) != 1)
							{
								mas[tX][i].style.background = colKill;
								mas[tX][i].name = 2;
							}
						}
						break;
					}
				}
				for (var i = tX + 1, j = tY + 1; i < tileX && j < tileY && i < tX + 9 && j < tY + 9; i++, j++)
				{
					if (masF[i][j].index < 14)
					{
						if (figCol != mas[i][j].index && (masCon[mas[i][j].index] == 0 || mas[i][j].index == mas[tX][tY].index))
						{
							if (checker(tX, tY, i, j) != 1)
							{
								mas[i][j].style.background = colHod;
								mas[i][j].name = 2;
							}
						}
					}
					else
					{
						if (figCol != mas[i][j].index && ("" + masF[i][j].index)[3] != nowH && ("" + masF[i][j].index)[3] != 0)
						{
							if (checker(tX, tY, i, j) != 1)
							{
								mas[i][j].style.background = colKill;
								mas[i][j].name = 2;
							}
						}
						break;
					}
				}
				for (var i = tX - 1, j = tY - 1; i >= 0 && j >= 0 && i > tX - 9 && j > tY - 9; i--, j--)
				{
					if (masF[i][j].index < 14)
					{
						if (figCol != mas[i][j].index && (masCon[mas[i][j].index] == 0 || mas[i][j].index == mas[tX][tY].index))
						{
							if (checker(tX, tY, i, j) != 1)
							{
								mas[i][j].style.background = colHod;
								mas[i][j].name = 2;
							}
						}
					}
					else
					{
						if (figCol != mas[i][j].index && ("" + masF[i][j].index)[3] != nowH && ("" + masF[i][j].index)[3] != 0)
						{
							if (checker(tX, tY, i, j) != 1)
							{
								mas[i][j].style.background = colKill;
								mas[i][j].name = 2;
							}
						}
						break;
					}
				}
				for (var i = tX + 1, j = tY - 1; i < tileX && j >= 0 && i < tX + 9 && j > tY - 9; i++, j--)
				{
					if (masF[i][j].index < 14)
					{
						if (figCol != mas[i][j].index && (masCon[mas[i][j].index] == 0 || mas[i][j].index == mas[tX][tY].index))
						{
							if (checker(tX, tY, i, j) != 1)
							{
								mas[i][j].style.background = colHod;
								mas[i][j].name = 2;
							}
						}
					}
					else
					{
						if (figCol != mas[i][j].index && ("" + masF[i][j].index)[3] != nowH && ("" + masF[i][j].index)[3] != 0)
						{
							if (checker(tX, tY, i, j) != 1)
							{
								mas[i][j].style.background = colKill;
								mas[i][j].name = 2;
							}
						}
						break;
					}
				}
				for (var i = tX - 1, j = tY + 1; i >= 0 && j < tileY && i > tX - 9 && j < tY + 9; i--, j++)
				{
					if (masF[i][j].index < 14)
					{
						if (figCol != mas[i][j].index && (masCon[mas[i][j].index] == 0 || mas[i][j].index == mas[tX][tY].index))
						{
							if (checker(tX, tY, i, j) != 1)
							{
								mas[i][j].style.background = colHod;
								mas[i][j].name = 2;
							}
						}
					}
					else
					{
						if (figCol != mas[i][j].index && ("" + masF[i][j].index)[3] != nowH && ("" + masF[i][j].index)[3] != 0)
						{
							if (checker(tX, tY, i, j) != 1)
							{
								mas[i][j].style.background = colKill;
								mas[i][j].name = 2;
							}
						}
						break;
					}
				}
			}
			else if (figNum === "6")	// Король
			{
				if (tX - 1 >= 0 && tY - 1 >= 0)
				{
					if (masF[tX - 1][tY - 1].index < 14)
					{
						if (figCol != mas[tX - 1][tY - 1].index && (masCon[mas[tX - 1][tY - 1].index] == 0 || mas[tX - 1][tY - 1].index == mas[tX][tY].index))
						{
							if (checker(tX, tY, tX - 1, tY - 1) != 1)
							{
								mas[tX - 1][tY - 1].style.background = colHod;
								mas[tX - 1][tY - 1].name = 2;
							}
						}
					}
					else
					{
						if (figCol != mas[tX - 1][tY - 1].index && ("" + masF[tX - 1][tY - 1].index)[3] != nowH && ("" + masF[tX - 1][tY - 1].index)[3] != 0)
						{
							if (checker(tX, tY, tX - 1, tY - 1) != 1)
							{
								mas[tX - 1][tY - 1].style.background = colKill;
								mas[tX - 1][tY - 1].name = 2;
							}
						}
					}
				}
				if (tY - 1 >= 0)
				{
					if (masF[tX][tY - 1].index < 14)
					{
						if (figCol != mas[tX][tY - 1].index && masCon[mas[tX][tY - 1].index] == 0)
						{
							if (checker(tX, tY, tX, tY - 1) != 1)
							{
								mas[tX][tY - 1].style.background = colHod;
								mas[tX][tY - 1].name = 2;
							}
						}
					}
					else
					{
						if (figCol != mas[tX][tY - 1].index && ("" + masF[tX][tY - 1].index)[3] != nowH && ("" + masF[tX][tY - 1].index)[3] != 0)
						{
							if (checker(tX, tY, tX, tY - 1) != 1)
							{
								mas[tX][tY - 1].style.background = colKill;
								mas[tX][tY - 1].name = 2;
							}
						}
					}
				}
				if (tX + 1 < tileX && tY - 1 >= 0)
				{
					if (masF[tX + 1][tY - 1].index < 14)
					{
						if (figCol != mas[tX + 1][tY - 1].index && (masCon[mas[tX + 1][tY - 1].index] == 0 || mas[tX + 1][tY - 1].index == mas[tX][tY].index))
						{
							if (checker(tX, tY, tX + 1, tY - 1) != 1)
							{
								mas[tX + 1][tY - 1].style.background = colHod;
								mas[tX + 1][tY - 1].name = 2;
							}
						}
					}
					else
					{
						if (figCol != mas[tX + 1][tY - 1].index && ("" + masF[tX + 1][tY - 1].index)[3] != nowH && ("" + masF[tX + 1][tY - 1].index)[3] != 0)
						{
							if (checker(tX, tY, tX + 1, tY - 1) != 1)
							{
								mas[tX + 1][tY - 1].style.background = colKill;
								mas[tX + 1][tY - 1].name = 2;
							}
						}
					}
				}
				if (tX + 1 < tileX)
				{
					if (masF[tX + 1][tY].index < 14)
					{
						if (figCol != mas[tX + 1][tY].index && masCon[mas[tX + 1][tY].index] == 0)
						{
							if (checker(tX, tY, tX + 1, tY) != 1)
							{
								mas[tX + 1][tY].style.background = colHod;
								mas[tX + 1][tY].name = 2;
							}
						}
					}
					else
					{
						if (figCol != mas[tX + 1][tY].index && ("" + masF[tX + 1][tY].index)[3] != nowH && ("" + masF[tX + 1][tY].index)[3] != 0)
						{
							if (checker(tX, tY, tX + 1, tY) != 1)
							{
								mas[tX + 1][tY].style.background = colKill;
								mas[tX + 1][tY].name = 2;
							}
						}
					}
				}
				if (tX + 1 < tileX && tY + 1 < tileY)
				{
					if (masF[tX + 1][tY + 1].index < 14)
					{
						if (figCol != mas[tX + 1][tY + 1].index && (masCon[mas[tX + 1][tY + 1].index] == 0 || mas[tX + 1][tY + 1].index == mas[tX][tY].index))
						{
							if (checker(tX, tY, tX + 1, tY + 1) != 1)
							{
								mas[tX + 1][tY + 1].style.background = colHod;
								mas[tX + 1][tY + 1].name = 2;
							}
						}
					}
					else
					{
						if (figCol != mas[tX + 1][tY + 1].index && ("" + masF[tX + 1][tY + 1].index)[3] != nowH && ("" + masF[tX + 1][tY + 1].index)[3] != 0)
						{
							if (checker(tX, tY, tX + 1, tY + 1) != 1)
							{
								mas[tX + 1][tY + 1].style.background = colKill;
								mas[tX + 1][tY + 1].name = 2;
							}
						}
					}
				}
				if (tY + 1 < tileY)
				{
					if (masF[tX][tY + 1].index < 14)
					{
						if (figCol != mas[tX][tY + 1].index && masCon[mas[tX][tY + 1].index] == 0)
						{
							if (checker(tX, tY, tX, tY + 1) != 1)
							{
								mas[tX][tY + 1].style.background = colHod;
								mas[tX][tY + 1].name = 2;
							}
						}
					}
					else
					{
						if (figCol != mas[tX][tY + 1].index && ("" + masF[tX][tY + 1].index)[3] != nowH && ("" + masF[tX][tY + 1].index)[3] != 0)
						{
							if (checker(tX, tY, tX, tY + 1) != 1)
							{
								mas[tX][tY + 1].style.background = colKill;
								mas[tX][tY + 1].name = 2;
							}
						}
					}
				}
				if (tX - 1 >= 0 && tY + 1 < tileY)
				{
					if (masF[tX - 1][tY + 1].index < 14)
					{
						if (figCol != mas[tX - 1][tY + 1].index && (masCon[mas[tX - 1][tY + 1].index] == 0 || mas[tX - 1][tY + 1].index == mas[tX][tY].index))
						{
							if (checker(tX, tY, tX - 1, tY + 1) != 1)
							{
								mas[tX - 1][tY + 1].style.background = colHod;
								mas[tX - 1][tY + 1].name = 2;
							}
						}
					}
					else
					{
						if (figCol != mas[tX - 1][tY + 1].index && ("" + masF[tX - 1][tY + 1].index)[3] != nowH && ("" + masF[tX - 1][tY + 1].index)[3] != 0)
						{
							if (checker(tX, tY, tX - 1, tY + 1) != 1)
							{
								mas[tX - 1][tY + 1].style.background = colKill;
								mas[tX - 1][tY + 1].name = 2;
							}
						}
					}
				}
				if (tX - 1 >= 0)
				{
					if (masF[tX - 1][tY].index < 14)
					{
						if (figCol != mas[tX - 1][tY].index && masCon[mas[tX - 1][tY].index] == 0)
						{
							if (checker(tX, tY, tX - 1, tY) != 1)
							{
								mas[tX - 1][tY].style.background = colHod;
								mas[tX - 1][tY].name = 2;
							}
						}
					}
					else
					{
						if (figCol != mas[tX - 1][tY].index && ("" + masF[tX - 1][tY].index)[3] != nowH && ("" + masF[tX - 1][tY].index)[3] != 0)
						{
							if (checker(tX, tY, tX - 1, tY) != 1)
							{
								mas[tX - 1][tY].style.background = colKill;
								mas[tX - 1][tY].name = 2;
							}
						}
					}
				}
				
				if (nowH == 1 && kingRock1 == 1)		// Ходы рокировки
				{
					if (masF[tX + 1][tY].index < 14 && masF[tX + 2][tY].index < 14 && masF[tX + 3][tY].index == 2001 && lad31 == 0)
					{
						var chek25 = 0;
						
						for (var i = tX + 4; i < tileX; i++)
						{
							if (14 < masF[i][tY].index)
							{
								if (("" + masF[i][tY].index)[3] == 2 && (("" + masF[i][tY].index)[0] == 2 || ("" + masF[i][tY].index)[0] == 5))
								{
									chek25 = 1;
								}
								break;
							}
						}
						
						if (checker(tX + 3, tY, tX + 2, tY) != 1 && checker(tX, tY, tX + 1, tY) != 1 && checker(tX, tY, tX + 2, tY) != 1 && chek25 == 0)
						{
							mas[tX + 2][tY].style.background = colRock;
							mas[tX + 2][tY].name = 3;
							
							rkx = tX + 3;
						}
					}
					else if (masF[tX + 1][tY].index < 14 && masF[tX + 2][tY].index < 14 && 
							masF[tX + 3][tY].index < 14 && masF[tX + 4][tY].index < 14 && masF[tX + 5][tY].index == 2071 && lad41 == 0)
					{
						var chek25 = 0;
						
						for (var i = tX + 6; i < tileX; i++)
						{
							if (14 < masF[i][tY].index)
							{
								if (("" + masF[i][tY].index)[3] == 2 && (("" + masF[i][tY].index)[0] == 2 || ("" + masF[i][tY].index)[0] == 5))
								{
									chek25 = 1;
								}
								break;
							}
						}
						
						if (checker(tX + 5, tY, tX + 4, tY) != 1 && checker(tX, tY, tX + 1, tY) != 1 && checker(tX, tY, tX + 2, tY) != 1 && chek25 == 0)
						{
							mas[tX + 2][tY].style.background = colRock;
							mas[tX + 2][tY].name = 3;
							
							if (checker(tX, tY, tX + 3, tY) != 1)
							{
								mas[tX + 3][tY].style.background = colRock;
								mas[tX + 3][tY].name = 3;
								
								if (checker(tX, tY, tX + 4, tY) != 1)
								{
									mas[tX + 4][tY].style.background = colRock;
									mas[tX + 4][tY].name = 3;
								}
							}
							
							rkx = tX + 5;
						}
					}
					
					if (masF[tX - 1][tY].index < 14 && masF[tX - 2][tY].index < 14 && masF[tX - 3][tY].index < 14 && masF[tX - 4][tY].index == 2001 && lad21 == 0)
					{
						var chek25 = 0;
						
						for (var i = tX - 5; i >= 0; i--)
						{
							if (14 < masF[i][tY].index)
							{
								if (("" + masF[i][tY].index)[3] == 2 && (("" + masF[i][tY].index)[0] == 2 || ("" + masF[i][tY].index)[0] == 5))
								{
									chek25 = 1;
								}
								break;
							}
						}
						
						if (checker(tX - 4, tY, tX - 3, tY) != 1 && checker(tX, tY, tX - 1, tY) != 1 && checker(tX, tY, tX - 2, tY) != 1 && chek25 == 0)
						{
							mas[tX - 2][tY].style.background = colRock;
							mas[tX - 2][tY].name = 3;
							
							if (checker(tX, tY, tX - 3, tY) != 1)
							{
								mas[tX - 3][tY].style.background = colRock;
								mas[tX - 3][tY].name = 3;
							}
							
							lkx = tX - 4;
						}
					}
					else if (masF[tX - 1][tY].index < 14 && masF[tX - 2][tY].index < 14 && masF[tX - 3][tY].index < 14 && 
							masF[tX - 4][tY].index < 14 && masF[tX - 5][tY].index < 14 && masF[tX - 6][tY].index == 2021 && lad11 == 0)
					{
						var chek25 = 0;
						
						for (var i = tX - 7; i >= 0; i--)
						{
							if (14 < masF[i][tY].index)
							{
								if (("" + masF[i][tY].index)[3] == 2 && (("" + masF[i][tY].index)[0] == 2 || ("" + masF[i][tY].index)[0] == 5))
								{
									chek25 = 1;
								}
								break;
							}
						}
						
						if (checker(tX - 6, tY, tX - 5, tY) != 1 && checker(tX, tY, tX - 1, tY) != 1 && checker(tX, tY, tX - 2, tY) != 1 && chek25 == 0)
						{
							mas[tX - 2][tY].style.background = colRock;
							mas[tX - 2][tY].name = 3;
							
							if (checker(tX, tY, tX - 3, tY) != 1)
							{
								mas[tX - 3][tY].style.background = colRock;
								mas[tX - 3][tY].name = 3;
								
								if (checker(tX, tY, tX - 4, tY) != 1)
								{
									mas[tX - 4][tY].style.background = colRock;
									mas[tX - 4][tY].name = 3;
									
									if (checker(tX, tY, tX - 5, tY) != 1)
									{
										mas[tX - 5][tY].style.background = colRock;
										mas[tX - 5][tY].name = 3;
									}
								}
							}
							
							lkx = tX - 6;
						}
					}
					
				}
				else if (nowH == 2 && kingRock2 == 1)
				{
					if (masF[tX + 1][tY].index < 14 && masF[tX + 2][tY].index < 14 && masF[tX + 3][tY].index == 2012 && lad32 == 0)
					{
						var chek25 = 0;
						
						for (var i = tX + 4; i < tileX; i++)
						{
							if (14 < masF[i][tY].index)
							{
								if (("" + masF[i][tY].index)[3] == 1 && (("" + masF[i][tY].index)[0] == 2 || ("" + masF[i][tY].index)[0] == 5))
								{
									chek25 = 1;
								}
								break;
							}
						}
						
						if (checker(tX + 3, tY, tX + 2, tY) != 1 && checker(tX, tY, tX + 1, tY) != 1 && checker(tX, tY, tX + 2, tY) != 1 && chek25 == 0)
						{
							mas[tX + 2][tY].style.background = colRock;
							mas[tX + 2][tY].name = 3;
							
							rkx = tX + 3;
						}
					}
					else if (masF[tX + 1][tY].index < 14 && masF[tX + 2][tY].index < 14 && 
							masF[tX + 3][tY].index < 14 && masF[tX + 4][tY].index < 14 && masF[tX + 5][tY].index == 2062 && lad42 == 0)
					{
						var chek25 = 0;
						
						for (var i = tX + 6; i < tileX; i++)
						{
							if (14 < masF[i][tY].index)
							{
								if (("" + masF[i][tY].index)[3] == 1 && (("" + masF[i][tY].index)[0] == 2 || ("" + masF[i][tY].index)[0] == 5))
								{
									chek25 = 1;
								}
								break;
							}
						}
						
						if (checker(tX + 5, tY, tX + 4, tY) != 1 && checker(tX, tY, tX + 1, tY) != 1 && checker(tX, tY, tX + 2, tY) != 1 && chek25 == 0)
						{
							mas[tX + 2][tY].style.background = colRock;
							mas[tX + 2][tY].name = 3;
							
							if (checker(tX, tY, tX + 3, tY) != 1)
							{
								mas[tX + 3][tY].style.background = colRock;
								mas[tX + 3][tY].name = 3;
								
								if (checker(tX, tY, tX + 4, tY) != 1)
								{
									mas[tX + 4][tY].style.background = colRock;
									mas[tX + 4][tY].name = 3;
								}
							}
							
							rkx = tX + 5;
						}
					}
					
					if (masF[tX - 1][tY].index < 14 && masF[tX - 2][tY].index < 14 && masF[tX - 3][tY].index < 14 && masF[tX - 4][tY].index == 2012 && lad22 == 0)
					{
						var chek25 = 0;
						
						for (var i = tX - 5; i >= 0; i--)
						{
							if (14 < masF[i][tY].index)
							{
								if (("" + masF[i][tY].index)[3] == 1 && (("" + masF[i][tY].index)[0] == 2 || ("" + masF[i][tY].index)[0] == 5))
								{
									chek25 = 1;
								}
								break;
							}
						}
						
						if (checker(tX - 4, tY, tX - 3, tY) != 1 && checker(tX, tY, tX - 1, tY) != 1 && checker(tX, tY, tX - 2, tY) != 1 && chek25 == 0)
						{
							mas[tX - 2][tY].style.background = colRock;
							mas[tX - 2][tY].name = 3;
							
							if (checker(tX, tY, tX - 3, tY) != 1)
							{
								mas[tX - 3][tY].style.background = colRock;
								mas[tX - 3][tY].name = 3;
							}
							
							lkx = tX - 4;
						}
					}
					else if (masF[tX - 1][tY].index < 14 && masF[tX - 2][tY].index < 14 && masF[tX - 3][tY].index < 14 && 
							masF[tX - 4][tY].index < 14 && masF[tX - 5][tY].index < 14 && masF[tX - 6][tY].index == 2112 && lad12 == 0)
					{
						var chek25 = 0;
						
						for (var i = tX - 7; i >= 0; i--)
						{
							if (14 < masF[i][tY].index)
							{
								if (("" + masF[i][tY].index)[3] == 1 && (("" + masF[i][tY].index)[0] == 2 || ("" + masF[i][tY].index)[0] == 5))
								{
									chek25 = 1;
								}
								break;
							}
						}
						
						if (checker(tX - 6, tY, tX - 5, tY) != 1 && checker(tX, tY, tX - 1, tY) != 1 && checker(tX, tY, tX - 2, tY) != 1 && chek25 == 0)
						{
							mas[tX - 2][tY].style.background = colRock;
							mas[tX - 2][tY].name = 3;
							
							if (checker(tX, tY, tX - 3, tY) != 1)
							{
								mas[tX - 3][tY].style.background = colRock;
								mas[tX - 3][tY].name = 3;
								
								if (checker(tX, tY, tX - 4, tY) != 1)
								{
									mas[tX - 4][tY].style.background = colRock;
									mas[tX - 4][tY].name = 3;
									
									if (checker(tX, tY, tX - 5, tY) != 1)
									{
										mas[tX - 5][tY].style.background = colRock;
										mas[tX - 5][tY].name = 3;
									}
								}
							}
							
							lkx = tX - 6;
						}
					}
				}
			} // else if (figNum === "6")
		} // function clickT(idT)
		
		
		
		
		




