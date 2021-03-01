<script>
</script>

<div class="wrapper">
	<div>
		<div>
			<svg height="100" width="1000" class="text-line">
				<text x="50%" y="50%" dominant-baseline="middle">
					Welcome to the
				</text>
			</svg>
		</div>
		<div>
			<svg height="100" width="1000" class="text-line">
				<text x="50%" y="50%" dominant-baseline="middle">
					Eye-share
				</text>
			</svg>
		</div>
		<div>
			<svg height="100" width="1000" class="text-line">
				<text x="50%" y="50%" dominant-baseline="middle">
					developer helper
				</text>
			</svg>
		</div>
	</div>
</div>

<style lang="scss">
	.wrapper {
		height: var(--router-view-height);
		width: 100%;

		display: grid;
		justify-content: center;
		align-items: center start;
	}

	svg {
		font-size: 4em;
		stroke: rgba(var(--eyeshare-green-1));
		stroke-width: 2;
	}

	.text-line text {
		user-select: none;
		font-weight: normal;
		font-style: normal;
		text-align: center;
		stroke-dasharray: 500;
		stroke-dashoffset: 500;
		text-anchor: middle;
		fill: none;
		font-size: 100;
		animation: dash 4s linear forwards, filling 3s ease-in forwards;
	}

	@keyframes dash {
		to {
			stroke-dashoffset: 0;
		}
	}

	@keyframes filling {
		from {
			fill: rgba(var(--eyeshare-green-1));
			fill-opacity: 0;
		}
		to {
			fill: rgba(var(--eyeshare-black-1));
			fill-opacity: 1;
			stroke-width: 1;
		}
	}
</style>
