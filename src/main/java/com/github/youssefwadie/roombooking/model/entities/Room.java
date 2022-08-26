package com.github.youssefwadie.roombooking.model.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import com.github.youssefwadie.roombooking.model.Layout;

@Entity
@Table(name = "rooms")
public class Room {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank(message = "Name cannot be blank")
	private String name;

	@NotBlank(message = "location cannot be blank")
	private String location;

	@OneToMany(cascade = { CascadeType.ALL })
	private List<LayoutCapacity> capacities;

	public Room(String name, String location) {
		this.name = name;
		this.location = location;
		capacities = new ArrayList<>();
		for (Layout layout : Layout.values()) {
			capacities.add(new LayoutCapacity(layout, 0));
		}
	}

	public Room() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public List<LayoutCapacity> getCapacities() {
		return capacities;
	}

	public void setCapacities(List<LayoutCapacity> capacities) {
		this.capacities = capacities;
	}

	public void setCapacity(LayoutCapacity capacity) {
		for (LayoutCapacity lc : capacities) {
			if (lc.getLayout() == capacity.getLayout()) {
				lc.setCapacity(capacity.getCapacity());
			}
		}
	}
}
